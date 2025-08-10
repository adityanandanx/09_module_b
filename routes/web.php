<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('09_module_b')->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::get('/login', function () {
        return Inertia::render('login');
    })->name('login');

    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware([IsAdmin::class])->group(function () {
        Route::get("/test-auth", function () {
            return "hello";
        });
    });
});


