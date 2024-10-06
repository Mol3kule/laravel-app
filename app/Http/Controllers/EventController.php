<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        return Inertia::render('Admin/EventsControlPanel', [
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
}
