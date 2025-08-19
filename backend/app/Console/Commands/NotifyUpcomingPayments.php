<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;
use Illuminate\Support\Facades\Mail;
use App\Mail\UpcomingPaymentNotification;
use Carbon\Carbon;

class NotifyUpcomingPayments extends Command
{
    protected $signature = 'subscriptions:notify-upcoming';
    protected $description = 'Notify users of upcoming subscription payments (<= 3 days)';

    public function handle(): void
    {
        $today = Carbon::today();

        $subscriptions = Subscription::with('user', 'provider')
            ->whereNotNull('next_payment_date')
            ->get();

        foreach ($subscriptions as $sub) {
            $nextPaymentDate = Carbon::parse($sub->next_payment_date);
            $diffDays = $today->diffInDays($nextPaymentDate, false);

            if ($diffDays > 0 && $diffDays <= 3) {
                // Evite doublons avec une colonne `notified_at` ou une clé cache
                $key = "notified-sub-{$sub->id}-{$sub->next_payment_date}";

                if (!cache()->has($key)) {
                    Mail::to($sub->user->email)->send(new UpcomingPaymentNotification($sub));

                    // Empêche de renvoyer plusieurs fois le même mail
                    cache()->put($key, true, now()->addDays(2)); // expire après 2 jours
                    $this->info("Notification envoyée à {$sub->user->email} pour {$sub->name}");
                }
            }
        }
    }
}
