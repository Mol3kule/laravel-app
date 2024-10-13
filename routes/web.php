<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group([
    'middleware' => ['auth', 'verified'],
], function () {
    Route::get('/dashboard', [EventController::class, 'index'])->name('dashboard');

    Route::group([
        'prefix' => 'event',
    ], function () {
        Route::get('/{id}', [EventController::class, 'getById'])->name('event.view');
        Route::delete('/{eventId}', [EventController::class, 'delete'])->name('event.delete');
        Route::delete('/{eventId}/{userId}', [EventController::class, 'dropUser'])->name('event.drop.user');
    });

    Route::group([
        'prefix' => '/admin',
        'middleware' => 'type:admin'
    ], function () {
        Route::get('/users_control_panel', function () {
            return Inertia::render('Admin/UsersControlPanel');
        })->name('users_control_panel');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
