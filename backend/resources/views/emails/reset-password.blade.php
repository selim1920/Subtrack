<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réinitialisation du mot de passe</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e0f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e0f7fa; padding: 50px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #00796b; padding: 50px; text-align: center; color: #ffffff;">
                            <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Reset Icon" width="70" style="margin-bottom: 15px;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Réinitialisation du mot de passe</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px; text-align: center;">
                            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 30px;">
                                Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour continuer.
                            </p>

                            <!-- Bouton -->
                            <a href="{{ $url }}" style="
                                display: inline-block;
                                padding: 15px 35px;
                                background-color: #ff7043;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 50px;
                                font-size: 16px;
                                font-weight: bold;
                                box-shadow: 0 6px 15px rgba(255,112,67,0.3);
                                transition: all 0.3s ease;
                            " onmouseover="this.style.backgroundColor='#ff5722'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 20px rgba(255,87,34,0.4)'" onmouseout="this.style.backgroundColor='#ff7043'; this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 15px rgba(255,112,67,0.3)'">
                                Réinitialiser mon mot de passe
                            </a>

                            <p style="font-size: 14px; color: #999; margin-top: 35px;">
                                Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet email.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #e0f7fa; padding: 25px; text-align: center; font-size: 12px; color: #666;">
                            &copy; 2025 SubTrack. Tous droits réservés.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
