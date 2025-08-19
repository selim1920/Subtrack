<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index()
    {
        try {
            $users = User::all(['id', 'name', 'email', 'role']); // Vérifie que la colonne "role" existe
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    // Ajouter un utilisateur
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'role' => 'required|string',
    ]);
    $user = User::create($validated);
    return response()->json($user);
}

// Mettre à jour utilisateur
public function update(Request $request, $id)
{
    $user = User::findOrFail($id);
    $validated = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email,' . $id,
        'role' => 'required|string',
    ]);
    $user->update($validated);
    return response()->json($user);
}

// Supprimer utilisateur
public function destroy($id)
{
    User::destroy($id);
    return response()->json(['message' => 'Utilisateur supprimé']);
}

}
