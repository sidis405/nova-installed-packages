<?php

namespace Strandafili\NovaInstalledPackages\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Strandafili\NovaInstalledPackages\Utils\ComposerStatus;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesInstaller;

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
    public function handle(NovaPackagesInstaller $installer, ComposerStatus $status)
    {
        $status->startInstalling($this->package, $this->packageKey);

        $installer->install($this->package);

        $status->finishInstalling($this->package, $this->packageKey);
    }
}
