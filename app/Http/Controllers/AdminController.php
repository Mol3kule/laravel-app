<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Admin/UsersControlPanel', [
            'data' => User::all(),
            'translations' => LocaleController::getTranslations('messages')
        ]);
    }

    public function editIndex(Request $request): RedirectResponse|Response
    {
        if (!$request->user()->isAdmin() || !$user = User::all()->find($request->id)) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        return Inertia::render('Admin/RenderUserForm', [
            'data' => $user,
            'translations' => LocaleController::getTranslations('messages')
        ]);
    }

    public function updateUser(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|min:3|max:40',
            'type' => ['required', new Enum(UserType::class)]
        ]);

        $user = User::findOrFail($request->id);
        $user->update([
            'name' => $validatedData['name'],
            'type' => $validatedData['type'],
        ]);

        return redirect()->intended(route('users_control_panel', absolute: false));
    }
}
