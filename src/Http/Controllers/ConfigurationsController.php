<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Strandafili\NovaInstalledPackages\Jobs\ConfigurePackage;

class ConfigurationsController extends Controller
{
    public function store(Request $request)
    {
        return json_encode(dispatch(new ConfigurePackage(request('package'))));
    }
}
