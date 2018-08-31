<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesFinder;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesInstaller;

class PackagesController extends Controller
{
    public function index(NovaPackagesFinder $novaPackagesFinder)
    {
        return $novaPackagesFinder->all();
    }

    public function store(Request $request, NovaPackagesInstaller $installer)
    {
        return $installer->install(request('package'));
    }
}
