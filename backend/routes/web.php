<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-mail', function () {
    Mail::raw('Ceci est un test d\'envoi d\'email via MailHog.', function ($message) {
        $message->to('test@example.com')
                ->subject('Test Mail via MailHog');
    });

    return 'Mail envoyé ! Vérifie dans MailHog.';
});
