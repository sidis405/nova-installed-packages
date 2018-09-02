<?php

namespace Strandafili\NovaInstalledPackages\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesInjector;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesConfigurator;

class ConfigurePackage implements ShouldQueue
{
    protected $package;

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
    public function handle(NovaPackagesConfigurator $configurator, NovaPackagesInjector $injector)
    {
        $configuration = $configurator->configure($this->package);

        $injectorOutput = $injector->inject($configuration);

        return [$configuration, $injectorOutput];
    }
}
