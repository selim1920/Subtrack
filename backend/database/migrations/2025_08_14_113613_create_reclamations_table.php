<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->string('name');      // Nom du visiteur
            $table->string('email');     // Email du visiteur
            $table->text('message');     // Message
            $table->enum('status', ['pending', 'resolved', 'rejected'])->default('pending'); // Statut
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reclamations');
    }
};
