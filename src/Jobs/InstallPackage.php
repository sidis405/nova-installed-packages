<?php

namespace Strandafili\NovaInstalledPackages\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesInjector;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesInstaller;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesConfigurator;

class InstallPackage implements ShouldQueue
{
    protected $package;
    protected $installer;

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($package)
    {
        $this->package = $package;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(NovaPackagesInstaller $installer, NovaPackagesConfigurator $configurator, NovaPackagesInjector $injector)
    {
        return $installer->install($this->package);
    }
}
