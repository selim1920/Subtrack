<?php

namespace App\Mail;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewSubscriptionNotification extends Mailable
{
    use Queueable, SerializesModels;

    public Subscription $subscription;

    public function __construct(Subscription $subscription)
    {
        $this->subscription = $subscription;
    }

    public function build()
    {
        return $this->subject('Nouvel abonnement créé')
            ->markdown('emails.subscription.new')
            ->with([
                'subscription' => $this->subscription,
                'user' => $this->subscription->user,
            ]);
    }
}
