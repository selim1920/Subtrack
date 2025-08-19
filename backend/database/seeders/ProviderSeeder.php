<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Provider;

class ProviderSeeder extends Seeder
{
    public function run()
    {
        Provider::insert([
            [
                'nom' => 'Netflix',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
            ],
            [
                'nom' => 'Spotify',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
            ],
            [
                'nom' => 'Amazon Prime Video',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
            ],
            [
                'nom' => 'Disney+',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
            ],
            [
                'nom' => 'YouTube Premium',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg',
            ],
            [
                'nom' => 'Apple TV+',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_TV_Plus_Logo.svg',
            ],
            [
                'nom' => 'HBO Max',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg',
            ],
            [
                'nom' => 'Deezer',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/4/42/Deezer_logo.svg',
            ],
            [
                'nom' => 'Tidal',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Tidal_logo.svg',
            ],
            [
                'nom' => 'Paramount+',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/9/97/Paramount_Plus_logo.svg',
            ],
            [
                'nom' => 'Canal+',
                'logo' => 'https://upload.wikimedia.org/wikipedia/fr/b/b5/Logo_Canal%2B_2013.svg',
            ],
            [
                'nom' => 'Molotov',
                'logo' => 'https://upload.wikimedia.org/wikipedia/fr/6/63/Molotov_TV_Logo.png',
            ],
        ]);
    }
}
