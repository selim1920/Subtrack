<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $resetUrl;

    public function __construct($resetUrl)
    {
        $this->resetUrl = $resetUrl;
    }

    public function build()
    {
        return $this->subject('Réinitialisation du mot de passe')
                    ->html('
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réinitialisation du mot de passe</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f0f4f8;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 0; background-color:#f0f4f8;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:15px; box-shadow:0 8px 20px rgba(0,0,0,0.1); overflow:hidden;">
                    
                    <!-- Header avec logo -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #6a11cb, #2575fc); padding:40px; text-align:center; color:#fff;">
                            <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Reset Icon" width="60" style="margin-bottom:15px;">
                            <h1 style="margin:0; font-size:28px;">Réinitialisation du mot de passe</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px; text-align:center; color:#555;">
                            <p style="font-size:16px; line-height:1.6;">
                                Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour continuer.
                            </p>

                            <a href="' . $this->resetUrl . '" style="
                                display:inline-block;
                                padding:15px 35px;
                                margin-top:20px;
                                background:#2575fc;
                                color:#fff;
                                text-decoration:none;
                                border-radius:50px;
                                font-weight:bold;
                                font-size:16px;
                                box-shadow:0 6px 15px rgba(37,117,252,0.3);
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background=\'#6a11cb\'; this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.background=\'#2575fc\'; this.style.transform=\'translateY(0)\'">
                                Réinitialiser mon mot de passe
                            </a>

                            <p style="font-size:14px; color:#999; margin-top:30px;">
                                Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet email.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f0f4f8; padding:20px; text-align:center; font-size:12px; color:#aaa;">
                            &copy; 2025 SubTrack. Tous droits réservés.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
');
    }
}
