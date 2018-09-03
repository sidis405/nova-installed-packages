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
    protected $packageKey;

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($package, $packageKey)
    {
        $this->package = $package;
        $this->packageKey = $packageKey;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(NovaPackagesInstaller $installer, NovaPackagesConfigurator $configurator, NovaPackagesInjector $injector)
    {
        cache()->put('composer.is_running', true, 10);
        cache()->put('composer.package', $this->package, 10);
        cache()->put('composer.packageKey', $this->packageKey, 10);
        cache()->put('composer.needs_configuration', false, 10);

        $installerOutput = $installer->install($this->package);

        cache()->put('composer.is_running', false, 10);
        cache()->put('composer.needs_configuration', true, 10);

        return $installerOutput;
    }
}
