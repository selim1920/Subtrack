<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécute la migration.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // ID auto-incrémenté
            $table->string('name'); // nom complet
            $table->string('email')->unique(); // email unique
            $table->timestamp('email_verified_at')->nullable(); // date de vérification email
            $table->string('password'); // mot de passe
            $table->enum('role', ['user', 'admin'])->default('user'); // rôle par défaut
            $table->rememberToken(); // token "remember me"
            $table->timestamps(); // created_at et updated_at
        });
    }

    /**
     * Annule la migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
