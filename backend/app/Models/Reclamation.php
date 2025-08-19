<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    use HasFactory;

    // Autoriser le mass assignment
    protected $fillable = ['name', 'email', 'message', 'status'];
}
