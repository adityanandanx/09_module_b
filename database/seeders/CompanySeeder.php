<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Product;

class CompanySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $company = Company::create([
      'name' => 'Acme Corp',
      'address' => '123 Main St',
      'telephone' => '1234567890',
      'email' => 'info@acme.com',
      'owner_name' => 'John Doe',
      'owner_mobile' => '9876543210',
      'owner_email' => 'john@acme.com',
      'contact_name' => 'Jane Smith',
      'contact_mobile' => '8765432109',
      'contact_email' => 'jane@acme.com',
      'deactivated' => false,
    ]);

    Product::create([
      'name' => 'Acme Widget',
      'brand' => 'Acme',
      'company_id' => $company->id,
      'gross_weight' => 1.5,
      'net_content_weight' => 1.2,
      'weight_unit' => 'kg',
      'hidden' => false,
    ]);
    Product::create([
      'name' => 'Acme Gadget',
      'brand' => 'Acme',
      'company_id' => $company->id,
      'gross_weight' => 2.0,
      'net_content_weight' => 1.8,
      'weight_unit' => 'kg',
      'hidden' => false,
    ]);
  }
}
