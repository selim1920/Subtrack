<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class AdminSubscriptionController extends Controller
{
    // Affiche toutes les subscriptions (admin)
    public function index()
    {
        // On charge aussi le provider lié pour chaque abonnement
        $subscriptions = Subscription::with('provider')->get();

        return response()->json($subscriptions);
    }
}
