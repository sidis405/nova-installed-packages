<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Routing\Controller;

class ComposerController extends Controller
{
    public function show()
    {
        return [
            'is_running' => cache('composer.is_running', false),
            'package' => cache('composer.package', null),
            'needs_configuration' => cache('composer.needs_configuration', false),
        ];
    }

    public function reset()
    {
        cache()->put('composer.is_running', false, 10);
        cache()->put('composer.package', null, 10);
        cache()->put('composer.needs_configuration', false, 10);
    }
}
