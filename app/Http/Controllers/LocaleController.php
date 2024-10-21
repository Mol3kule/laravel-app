<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function switch(Request $request): \Illuminate\Http\RedirectResponse
    {
        Session::put('app_locale', request('locale'));
        return redirect()->back();
    }

    public static function getTranslations(string $file_name)
    {
        $locale = session('app_locale', app()->getLocale());
        $path = resource_path("lang/{$locale}/{$file_name}.json");

        // Load the content of the JSON file
        return File::exists($path) ? json_decode(File::get($path), true) : [];
    }
}
