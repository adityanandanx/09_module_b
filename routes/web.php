<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('09_module_b')->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::get('/login', function () {
        return Inertia::render('login');
    });

    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware([IsAdmin::class])->group(function () {
        Route::resource('companies', CompanyController::class);
        Route::post('companies/{company}/deactivate', [CompanyController::class, 'deactivate'])->name('companies.deactivate');
        Route::post('companies/{company}/activate', [CompanyController::class, 'activate'])->name('companies.activate');

        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/01/{product}', [ProductController::class, 'show'])->name('products.show');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    });
});


