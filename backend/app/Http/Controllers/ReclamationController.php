<?php

namespace App\Http\Controllers;

use App\Models\Reclamation;
use Illuminate\Http\Request;

class ReclamationController extends Controller
{
    // Liste toutes les réclamations
    public function index()
    {
        return response()->json(Reclamation::all());
    }

    // Crée une nouvelle réclamation (publique)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $reclamation = Reclamation::create($request->only('name', 'email', 'message'));
        return response()->json($reclamation, 201);
    }

    // Affiche une réclamation spécifique
    public function show($id)
    {
        $reclamation = Reclamation::findOrFail($id);
        return response()->json($reclamation);
    }

    // Met à jour une réclamation (admin)
    public function update(Request $request, $id)
    {
        $reclamation = Reclamation::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'message' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:pending,resolved,rejected',
        ]);

        $reclamation->update($request->only('name', 'email', 'message', 'status'));
        return response()->json($reclamation);
    }

    // Supprime une réclamation (admin)
    public function destroy($id)
    {
        $reclamation = Reclamation::findOrFail($id);
        $reclamation->delete();
        return response()->json(null, 204);
    }
}
