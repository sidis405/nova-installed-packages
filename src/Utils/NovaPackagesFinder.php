<?php

namespace Strandafili\NovaInstalledPackages\Utils;

use Composed;

class NovaPackagesFinder
{
    public function all()
    {
        return $this->getAllInstalledPackages()->map(function ($package) {
            return collect($package->getConfig())->only(['name', 'description', 'keywords', 'version', 'authors', 'type', 'autoload', 'extra']);
        })->filter(function ($package) {
            return in_array('nova', ($package['keywords']) ?? []);
        });
    }
    private function getAllInstalledPackages()
    {
        return collect(Composed\packages());
    }
}
