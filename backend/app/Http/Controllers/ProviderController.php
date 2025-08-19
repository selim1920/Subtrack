<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    public function index()
    {
        return response()->json(Provider::all(['id', 'nom', 'logo']));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'logo' => 'required|url',
        ]);

        $provider = Provider::create($validated);

        return response()->json($provider, 201);
    }

    public function show($id)
    {
        $provider = Provider::findOrFail($id);
        return response()->json($provider);
    }

    public function update(Request $request, $id)
    {
        $provider = Provider::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'logo' => 'sometimes|required|url',
        ]);

        $provider->update($validated);

        return response()->json($provider);
    }

    public function destroy($id)
    {
        $provider = Provider::findOrFail($id);
        $provider->delete();

        return response()->json(null, 204);
    }
}
