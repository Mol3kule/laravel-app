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
}
