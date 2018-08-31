<?php

namespace Strandafili\NovaInstalledPackages\Utils;

use Illuminate\Support\Composer;
use Symfony\Component\Process\Process;
use Symfony\Component\HttpFoundation\StreamedResponse;

class NovaPackagesInstaller extends Composer
{
    public function install($package)
    {
        $package = $package ?? "themsaid/nova-cashier-manager";

        $response = new StreamedResponse();
        $response->headers->set('X-Accel-Buffering', 'no');
        $process = $this->getProcess();

        $command = trim($this->findComposer().' require '. $package . ' -v --working-dir=' . app_path('../'));

        $process->setCommandLine($command);

        // $process = new Process('/sbin/ping -c 4 example.com');

        $process->start();
        // dd($process->getIterator());

        $response->setCallback(function () use ($process) {
            while ($process->isStarted()) {
                // ob_implicit_flush(true);
                if ($output = $process->getIncrementalOutput()) {
                    echo "--" . $output . "--" . '.<br />';
                }
                ob_flush();
                flush();
                if (! is_null($process->getExitCode())) {
                    break;
                }
                sleep(1);
            }
        });
        return $response->send();

        // try {
        //     $process->mustRun(function ($type, $buffer) use ($process) {
        //         if (Process::ERR === $type) {
        //         }
        //         // logger('$buffer');
        //         echo $buffer;
        //     });
        // } catch (ProcessFailedException $e) {
        //     return $e->getMessage();
        // }

        // return $process->getIncrementalOutput();
    }
}
