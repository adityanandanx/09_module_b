<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $pass = $request->input('passphrase');

        if ($pass == 'admin') {
            return to_route('login')->withCookie(cookie('is_admin', true));
        }

        return to_route('login')->withErrors(['passphrase' => 'invalid credentials']);
    }
}
