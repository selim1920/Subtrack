@component('mail::message')
{{-- Header moderne avec gradient et icône --}}
<div style="background: linear-gradient(135deg, #ff7e5f, #feb47b); padding: 30px; border-radius: 12px; text-align: center; color: #fff; font-size: 26px; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Subscription Icon" width="50" style="margin-bottom: 10px;">
    Nouvel abonnement ajouté
</div>

{{-- Introduction --}}
<p style="font-size: 16px; color: #555; margin-top: 25px; line-height: 1.6;">
Bonjour {{ $user->name }},  
Vous venez de créer un nouvel abonnement. Voici les détails :
</p>

{{-- Carte des détails --}}
<div style="background: #ffffff; padding: 25px; border-radius: 15px; margin: 20px 0; font-size: 16px; color: #333; box-shadow: 0 8px 25px rgba(0,0,0,0.08); transition: transform 0.3s;">
    <p style="margin: 12px 0;"><strong>📌 Nom :</strong> {{ $subscription->name }}</p>
    <p style="margin: 12px 0;"><strong>💰 Montant :</strong> {{ $subscription->amount }} €</p>
    <p style="margin: 12px 0;"><strong>📅 Prochaine échéance :</strong> {{ $subscription->next_payment_date }}</p>
</div>

{{-- Bouton moderne avec hover --}}
@component('mail::button', ['url' => url('/subscriptions'), 'color' => 'success'])
Voir mes abonnements
@endcomponent

<p style="font-size: 14px; color: #999; margin-top: 25px;">
Merci d'utiliser SubTrack !  
&copy; 2025 SubTrack. Tous droits réservés.
</p>
@endcomponent
