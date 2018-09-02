<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Strandafili\NovaInstalledPackages\Jobs\ConfigurePackage;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesInjector;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesConfigurator;

class ConfigurationsController extends Controller
{
    public function store(Request $request, NovaPackagesConfigurator $configurator, NovaPackagesInjector $injector)
    {
        $configuration = $configurator->configure(request('package'));

        $injectorOutput = $injector->inject($configuration);

        return $injectorOutput;

        // $result = dispatch(new ConfigurePackage(request('package')));

        // return json_encode($result);
    }
}
