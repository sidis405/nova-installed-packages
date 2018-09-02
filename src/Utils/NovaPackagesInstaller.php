<?php

namespace Strandafili\NovaInstalledPackages\Utils;

use Illuminate\Support\Composer;

class NovaPackagesInstaller extends Composer
{
    public function install($package)
    {
        $process = $this->getProcess();

        $command = trim($this->findComposer().' require '. $package . ' -v --working-dir=' . app_path('../'));

        $process->setCommandLine($command);

        $process->run();

        return $process->getOutput();
    }
}
