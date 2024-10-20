<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EventController extends Controller
{
    protected string $table = 'events';

    public function index(Request $request): \Inertia\Response
    {
        return Inertia::render('Dashboard', [
            'data' => Event::all()
        ]);
    }

    public function createIndex(Request $request): \Inertia\Response
    {
        return Inertia::render('Event/CreateEvent', []);
    }

    public function createEvent(Request $request): \Illuminate\Http\RedirectResponse
    {
        Log::debug($request);
        
        $request->validate([
            'title' => 'required|string|min:3|max:40',
            'description' => 'string',
            'date_time' => 'date'
        ]);
//        $event = Event::factory()->create([
//            'title' => request('title'),
//            'description' => request('description'),
//            'date_time' => request('date_time')
//        ])->toArray();
//
        return redirect()->back();
//        return redirect()->route('event.view', ['id' => $event['id']]);
    }

    public function getById(Request $request): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        if (!$event = Event::all()->find($request->id)) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        return Inertia::render('Event/Event', [
            'data' => $event
        ]);
    }

    public function delete(int $id): \Illuminate\Http\RedirectResponse
    {
        if (request()->user()->isAdmin()) {
            Event::destroy($id);
        }
        return redirect()->route('dashboard');
    }

    public function dropUser(int $eventId, int $userId): \Illuminate\Http\RedirectResponse
    {
        if (request()->user()->isAdmin()) {
            Event::whereId($eventId)
                ->whereJsonContains('users', $userId)
                ->update([
                    'users' => DB::raw("JSON_REMOVE(`users`, JSON_UNQUOTE(JSON_SEARCH(`users`, 'one', $userId)))")
                ]);
        }

        return redirect()->back();
    }

    public function toggleJoin(int $eventId): \Illuminate\Http\RedirectResponse
    {
        $event = Event::find($eventId);

        if (!$event) {
            return redirect()->route('dashboard');
        }

        $userId = request()->user()->id;

        $usersArray = $event->users->pluck('id')->toArray() ?? []; // Get the users array or an empty array if null

        if (in_array($userId, $usersArray)) {
            // Remove userId from the users array
            $event->update([
                'users' => DB::raw("JSON_REMOVE(`users`, JSON_UNQUOTE(JSON_SEARCH(`users`, 'one', $userId)))")
            ]);
        } else {
            // Add userId to the users array
            $event->update([
                'users' => DB::raw("JSON_ARRAY_APPEND(`users`, '$', $userId)")
            ]);
        }

        return redirect()->back();
    }
}
