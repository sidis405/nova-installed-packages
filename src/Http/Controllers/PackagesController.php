<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Strandafili\NovaInstalledPackages\Jobs\InstallPackage;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesFinder;

class PackagesController extends Controller
{
    public function index(NovaPackagesFinder $novaPackagesFinder)
    {
        return $novaPackagesFinder->all();
    }

    public function store(Request $request)
    {
        dispatch(
            new InstallPackage(request('package'), request('packageKey'))
        );

        return response(null, 204);
    }
}