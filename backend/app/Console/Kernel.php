<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Déclare les commandes Artisan disponibles.
     *
     * @var array<int, class-string|string>
     */
    protected $commands = [
        // Si ta commande n'est pas auto-enregistrée, tu peux la déclarer ici
        // \App\Console\Commands\SendUpcomingPaymentNotifications::class,
    ];

    /**
     * Configure la planification des tâches.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
 protected function schedule(Schedule $schedule): void
{
$schedule->command('subscriptions:notify-upcoming')->everyMinute();
}

    /**
     * Enregistre les commandes artisan personnalisées.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        // require base_path('routes/console.php');
    }
}
