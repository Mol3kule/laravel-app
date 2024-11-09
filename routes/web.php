<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LocaleController;
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
    'middleware' => ['auth', 'verified', 'locale'],
], function () {
    Route::get('/dashboard', [EventController::class, 'index'])->name('dashboard');

    Route::group([
        'prefix' => '/event',
    ], function () {
        Route::get('/create', [EventController::class, 'createIndex'])->name('event.create.index')->middleware('type:admin');
        Route::post('/create', [EventController::class, 'createEvent'])->name('event.create.submit')->middleware('type:admin');
        Route::get('/{id}', [EventController::class, 'getById'])->name('event.view');
        Route::delete('/{eventId}', [EventController::class, 'delete'])->name('event.delete');
        Route::patch('/{eventId}', [EventController::class, 'toggleJoin'])->name('event.toggle.join');
        Route::delete('/{eventId}/{userId}', [EventController::class, 'dropUser'])->name('event.drop.user');
    });

    Route::group([
        'prefix' => '/admin',
        'middleware' => 'type:admin'
    ], function () {
        Route::group([
            'prefix' => '/users_control_panel'
        ], function () {
            Route::get('/', [AdminController::class, 'index'])->name('users_control_panel');
            Route::get('/{id}', [AdminController::class, 'editIndex'])->name('admin.users_control_panel.edit');
            Route::patch('/{id}', [AdminController::class, 'updateUser'])->name('admin.users_control_panel.update');
        });
    });

    Route::patch('/locale-switch', [LocaleController::class, 'switch'])->name('locale.switch');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
