<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. They are protected
| by your tool's "Authorize" middleware by default. Now, go build!
|
*/

Route::get('/', \Strandafili\NovaInstalledPackages\Http\Controllers\PackagesController::class . '@index');

Route::post('/', \Strandafili\NovaInstalledPackages\Http\Controllers\PackagesController::class . '@store');
Route::post('/configure', \Strandafili\NovaInstalledPackages\Http\Controllers\ConfigurationsController::class . '@store');

Route::get('/composer', \Strandafili\NovaInstalledPackages\Http\Controllers\ComposerController::class . '@show');
Route::get('/composer-reset', \Strandafili\NovaInstalledPackages\Http\Controllers\ComposerController::class . '@reset');


Route::get('/ping', function () {
    $response = new Symfony\Component\HttpFoundation\StreamedResponse();
    $response->headers->set('X-Accel-Buffering', 'no');
    $composer = app()->make('composer-installer');

    $process = $composer->getProcess();
    // dd($process);

    $process->setCommandLine('/sbin/ping -c 4 example.com');
    // $process->setCommandLine(trim($composer->findComposer().' dumpauto --optimize'));
    // $process = new Process('/sbin/ping -c 4 example.com');
    $process->enableOutput();
    $process->start();

    $response->setCallback(function () use ($process) {
        while ($process->isStarted()) {
            if ($process->getIncrementalOutput()) {
                echo $process->getOutput() . '<br />';
            }
            ob_flush();
            flush();
            if (! is_null($process->getExitCode())) {
                break;
            }
            sleep(1);
        }
    });
    $response->send();
});
