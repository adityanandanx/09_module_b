<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\IsAdmin;
use App\Models\Product;
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

        Route::get('/products.json', function (\Illuminate\Http\Request $request) {
            $query = $request->input('query');
            $perPage = (int) $request->input('per_page', 10);
            $products = Product::query();
            if ($query) {
                $products->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%$query%")
                        ->orWhere('name_fr', 'like', "%$query%")
                        ->orWhere('description', 'like', "%$query%")
                        ->orWhere('description_fr', 'like', "%$query%");
                });
            }
            $paginated = $products->with('company')->paginate($perPage)->appends($request->except('page'));
            $data = $paginated->getCollection()->map(function ($product) {
                return [
                    'name' => [
                        'en' => $product->name,
                        'fr' => $product->name_fr,
                    ],
                    'description' => [
                        'en' => $product->description,
                        'fr' => $product->description_fr,
                    ],
                    'gtin' => $product->gtin,
                    'brand' => $product->brand,
                    'countryOfOrigin' => $product->country_of_origin,
                    'weight' => [
                        'gross' => $product->gross_weight,
                        'net' => $product->net_content_weight,
                        'unit' => $product->weight_unit,
                    ],
                    'company' => [
                        'companyName' => $product->company->name ?? null,
                        'companyAddress' => $product->company->address ?? null,
                        'companyTelephone' => $product->company->telephone ?? null,
                        'companyEmail' => $product->company->email ?? null,
                        'owner' => [
                            'name' => $product->company->owner_name ?? null,
                            'mobileNumber' => $product->company->owner_mobile ?? null,
                            'email' => $product->company->owner_email ?? null,
                        ],
                        'contact' => [
                            'name' => $product->company->contact_name ?? null,
                            'mobileNumber' => $product->company->contact_mobile ?? null,
                            'email' => $product->company->contact_email ?? null,
                        ],
                    ],
                ];
            })->values();

            $pagination = [
                'current_page' => $paginated->currentPage(),
                'total_pages' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'next_page_url' => $paginated->nextPageUrl(),
                'prev_page_url' => $paginated->previousPageUrl(),
            ];

            return [
                'data' => $data,
                'pagination' => $pagination,
            ];
        });
        Route::get('/products/{gtin}.json', function (string $gtin) {
            $product = Product::with('company')->findOrFail($gtin);
            return [
                'name' => [
                    'en' => $product->name,
                    'fr' => $product->name_fr,
                ],
                'description' => [
                    'en' => $product->description,
                    'fr' => $product->description_fr,
                ],
                'gtin' => $product->gtin,
                'brand' => $product->brand,
                'countryOfOrigin' => $product->country_of_origin,
                'weight' => [
                    'gross' => $product->gross_weight,
                    'net' => $product->net_content_weight,
                    'unit' => $product->weight_unit,
                ],
                'company' => [
                    'companyName' => $product->company->name ?? null,
                    'companyAddress' => $product->company->address ?? null,
                    'companyTelephone' => $product->company->telephone ?? null,
                    'companyEmail' => $product->company->email ?? null,
                    'owner' => [
                        'name' => $product->company->owner_name ?? null,
                        'mobileNumber' => $product->company->owner_mobile ?? null,
                        'email' => $product->company->owner_email ?? null,
                    ],
                    'contact' => [
                        'name' => $product->company->contact_name ?? null,
                        'mobileNumber' => $product->company->contact_mobile ?? null,
                        'email' => $product->company->contact_email ?? null,
                    ],
                ],
            ];
        });
    });
});


