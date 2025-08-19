@component('mail::message')
{{-- Header --}}
<div style="background-color: #4CAF50; padding: 15px 20px; border-radius: 8px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 24px;">💳 Prochain Paiement</h1>
</div>

{{-- Introduction --}}
<p style="font-size: 16px; color: #2c3e50; margin-top: 20px;">
Bonjour <strong>{{ $subscription->user->name }}</strong>,
</p>

{{-- Info Abonnement --}}
<div style="background-color: #f1f2f6; border-left: 5px solid #4CAF50; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
    <p style="margin: 0; font-size: 16px;">
        Votre abonnement <strong>{{ $subscription->name }}</strong> chez <strong>{{ $subscription->provider->nom ?? 'Inconnu' }}</strong> doit être payé le <strong>{{ \Carbon\Carbon::parse($subscription->next_payment_date)->format('d/m/Y') }}</strong>.
    </p>
    <p style="margin: 5px 0 0; font-size: 16px;">
        Montant : <strong>{{ number_format($subscription->amount, 2) }} €</strong>
    </p>
</div>



{{-- Footer --}}
<p style="font-size: 14px; color: #7f8c8d; margin-top: 30px;">
Merci,<br>
L'équipe de {{ config('app.name') }}
</p>
@endcomponent
