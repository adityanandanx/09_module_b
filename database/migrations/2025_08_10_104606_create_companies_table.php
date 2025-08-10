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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            // company info
            $table->string('name');
            $table->string('address');
            $table->string('telephone');
            $table->string('email');

            // owner info
            $table->string('owner_name');
            $table->string('owner_mobile');
            $table->string('owner_email');

            // contact info
            $table->string('contact_name');
            $table->string('contact_mobile');
            $table->string('contact_email');
            $table->timestamps();

            // deactivation flag
            $table->boolean('deactivated')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
