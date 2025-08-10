<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            // GTIN
            $table->id('gtin');

            // Basic details
            $table->string('name');
            $table->string('name_fr')->nullable();

            // Descriptions
            $table->text('description')->nullable();
            $table->text('description_fr')->nullable();

            // Brand and origin
            $table->string('brand');
            $table->string('country_of_origin', 100)->nullable();

            // Weights
            $table->decimal('gross_weight', 8, 2)->nullable(); // includes packaging
            $table->decimal('net_content_weight', 8, 2)->nullable();
            $table->string('weight_unit', 20)->default('kg'); // eg: kg, g, lb, oz
            $table->boolean('hidden')->default('false');

            // Foriegn keys
            $table->foreignId('company_id')->constrained('companies');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
