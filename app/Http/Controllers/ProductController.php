<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('products/list', ['products' => Product::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/create', ['companies' => Company::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate(
            [
                'name' => 'required',
                'name_fr' => 'required',
                'description' => 'required',
                'description_fr' => 'required',
                'brand' => 'required',
                'country_of_origin' => 'required',
                'gross_weight' => 'required|decimal:0,2',
                'net_content_weight' => 'required|decimal:0,2',
                'weight_unit' => 'required',
                'company_id' => 'exists:companies,id',
            ]
        );
        $product = Product::create($validated);
        // return to_route('products.show', $product);
        return redirect("/09_module_b/01/$product->gtin");
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/show', ['product' => $product, 'company' => $product->company]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('products/edit', ['product' => $product, 'companies' => Company::all()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate(
            [
                'name' => 'required|sometimes',
                'name_fr' => 'required|sometimes',
                'description' => 'required|sometimes',
                'description_fr' => 'required|sometimes',
                'brand' => 'required|sometimes',
                'country_of_origin' => 'required|sometimes',
                'gross_weight' => 'required|sometimes|decimal:0,2',
                'net_content_weight' => 'required|sometimes|decimal:0,2',
                'weight_unit' => 'required|sometimes',
                'company_id' => 'sometimes|exists:companies,id',
            ]
        );
        $product->update($validated);
        return redirect("/09_module_b/01/$product->gtin");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    public function deactivate(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}