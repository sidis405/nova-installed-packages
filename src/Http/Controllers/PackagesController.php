<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Routing\Controller;
use Strandafili\NovaInstalledPackages\Utils\NovaPackagesFinder;

class PackagesController extends Controller
{
    public function index(NovaPackagesFinder $novaPackagesFinder)
    {
        return $novaPackagesFinder->all();
    }
}
