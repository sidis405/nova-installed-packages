<?php

namespace Strandafili\NovaInstalledPackages\Utils;

class ComposerStatus
{
    public function startInstalling($package, $key)
    {
        cache()->put('composer.is_running', true, 10);
        cache()->put('composer.package', $package, 10);
        cache()->put('composer.packageKey', $key, 10);
        cache()->put('composer.needs_configuration', false, 10);
    }

    public function finishInstalling()
    {
        cache()->put('composer.is_running', false, 10);
        cache()->put('composer.needs_configuration', true, 10);
    }

    public function finishConfiguring()
    {
        cache()->put('composer.package', null, 10);
        cache()->put('composer.packageKey', null, 10);
        cache()->put('composer.needs_configuration', false, 10);
    }

    public function show()
    {
        return [
            'is_running' => cache('composer.is_running', false),
            'package' => cache('composer.package', null),
            'packageKey' => cache('composer.packageKey', null),
            'needs_configuration' => cache('composer.needs_configuration', false),
        ];
    }

    public function reset()
    {
        cache()->put('composer.is_running', false, 10);
        cache()->put('composer.package', null, 10);
        cache()->put('composer.packageKey', null, 10);
        cache()->put('composer.needs_configuration', false, 10);

        return $this->show();
    }
}
