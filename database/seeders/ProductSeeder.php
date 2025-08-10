<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Example: Add products for company with id 1
    Product::create([
      'name' => 'Sample Product 1',
      'brand' => 'BrandX',
      'company_id' => 1,
      'gross_weight' => 0.5,
      'net_content_weight' => 0.4,
      'weight_unit' => 'kg',
      'hidden' => false,
    ]);
    Product::create([
      'name' => 'Sample Product 2',
      'brand' => 'BrandY',
      'company_id' => 1,
      'gross_weight' => 0.8,
      'net_content_weight' => 0.7,
      'weight_unit' => 'kg',
      'hidden' => false,
    ]);
  }
}
