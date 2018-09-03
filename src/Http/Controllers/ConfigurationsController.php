<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Strandafili\NovaInstalledPackages\Utils\ComposerStatus;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesInjector;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesConfigurator;

class ConfigurationsController extends Controller
{
    public function store(Request $request, NovaPackagesConfigurator $configurator, NovaPackagesInjector $injector, ComposerStatus $status)
    {
        $configuration = $configurator->configure(request('package'));

        $injectorOutput = $injector->inject($configuration);

        $status->finishConfiguring();

        return $injectorOutput;
    }
}
