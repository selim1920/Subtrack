<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'provider_id',
        'name',
        'amount',
        'billing_cycle',
        'next_payment_date',
        'notes',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
        'next_payment_date' => 'date',
        'amount' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    // ✅ Accessor to dynamically include the logo path
    public function getLogoPathAttribute()
    {
        return $this->provider?->logo ?? null;
    }
}
