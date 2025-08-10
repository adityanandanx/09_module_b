<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // check for the is_admin cookie and only forward if it is true. else abort
        if ($request->cookie('is_admin') != 'true') {
            abort(403, 'Unauthorized');
        }
        return $next($request);
    }
}
