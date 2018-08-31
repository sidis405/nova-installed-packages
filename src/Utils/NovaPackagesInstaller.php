<?php

namespace Strandafili\NovaInstalledPackages\Utils;

use Illuminate\Support\Composer;
use Symfony\Component\HttpFoundation\StreamedResponse;

class NovaPackagesInstaller extends Composer
{
    public function install($package)
    {
        $response = new StreamedResponse();
        $response->headers->set('X-Accel-Buffering', 'no');
        $process = $this->getProcess();

        $command = trim($this->findComposer().' require '. $package . ' -v --working-dir=' . app_path('../'));

        $process->setCommandLine($command);

        $process->start();

        $response->setCallback(function () use ($process) {
            while ($process->isStarted()) {
                if ($output = $process->getIncrementalOutput()) {
                    echo $output;
                }
                ob_flush();
                flush();
                if (! is_null($exitCode = $process->getExitCode())) {
                    break;
                }
                sleep(1);
            }
        });
        return $response->send();
    }
}
