<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $pass = $request['passphrase'];


        if ($pass == 'admin') {
            return redirect()
                ->route('companies.index')
                ->withCookie(cookie('is_admin', 'true', 60 * 60));
        }

        return redirect()
            ->back()
            ->withCookie(cookie('is_admin', 'false', 0))
            ->withErrors(['passphrase' => 'Invalid Passphrase']);
    }
}
