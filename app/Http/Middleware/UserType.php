<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserType
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next, string $type): Response
    {
        if (!$user = Auth::user()) {
            return redirect()->route('login');
        }

        if ($type === 'all' || ($type === 'restricted' && ($user->isAdmin() || $user->isEmployer()))) {
            return $next($request);
        }

        if ($type === 'admin' && $user->isAdmin()) {
            return $next($request);
        }

        return redirect()->route('dashboard');
    }
}
