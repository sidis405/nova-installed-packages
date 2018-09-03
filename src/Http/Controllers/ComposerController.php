<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Routing\Controller;

class ComposerController extends Controller
{
    public function show()
    {
        return [
            'is_running' => session('composer.is_running', false),
            'package' => session('composer.package', null),
            'needs_configuration' => session('composer.needs_configuration', false),
        ];
    }
}
