<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validation des données
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Appel à l'endpoint OAuth
        $oauthUrl = env('OAUTH_URL', 'http://nginx');

        try {
            $response = Http::asForm()->post($oauthUrl . '/oauth/token', [
                'grant_type'    => 'password',
                'client_id'     => env('PASSPORT_PASSWORD_CLIENT_ID'),
                'client_secret' => env('PASSPORT_PASSWORD_CLIENT_SECRET'),
                'username'      => $request->email,
                'password'      => $request->password,
                'scope'         => '',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur de connexion au serveur OAuth',
                'error' => $e->getMessage()
            ], 500);
        }

        if ($response->failed()) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $tokenData = $response->json();

        // 3. Récupération des infos utilisateur (rôle inclus)
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        // 4. Réponse enrichie
        return response()->json([
            'access_token' => $tokenData['access_token'],
            'token_type' => $tokenData['token_type'],
            'expires_in' => $tokenData['expires_in'],
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role
            ]
        ]);
    }
public function logout(Request $request)
{
    $user = $request->user();
    if ($user) {
        $token = $user->token();
        if ($token) {
            $token->revoke();
            $token->delete(); // supprime aussi le token de la base
        }
    }

    return response()->json(['message' => 'Déconnexion réussie']);
}
}