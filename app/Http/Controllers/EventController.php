<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
}
