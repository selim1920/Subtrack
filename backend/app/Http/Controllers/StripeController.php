<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api'); // sécuriser la route
    }

    public function createPaymentIntent(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0.5',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Initialisation de Stripe avec la clé secrète
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            // Création du PaymentIntent
            $intent = PaymentIntent::create([
                'amount' => intval($request->amount * 100), // Montant en centimes
                'currency' => 'eur', // ou 'usd' selon ton besoin
                'metadata' => [
                    'user_id' => Auth::id(),
                    'purpose' => 'subscription_payment'
                ],
            ]);

            return response()->json([
                'clientSecret' => $intent->client_secret
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Échec de la création du paiement : ' . $e->getMessage()
            ], 500);
        }
    }
}
