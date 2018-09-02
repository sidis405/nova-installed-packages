<?php

namespace Strandafili\NovaInstalledPackages\Utils;

class NovaPackagesReplaceInjector
{
    public function inject($configuration)
    {
        $novaServiceProvider = app_path('Providers/') . '/NovaServiceProvider.php';

        $contents = file_get_contents($novaServiceProvider);

        foreach ($configuration as $type => $items) {
            if (count($items)) {
                foreach ($items as $item) {
                    $token = '//' . strtoupper($type) . '_SLOT';

                    if (! strpos($contents, $item['injectableString'])) {
                        $contents = str_replace($token, $item['injectableString'] . ',' . chr(0x0D).chr(0x0A).chr(9).chr(9).chr(9) . $token, $contents);
                    }
                }
            }
        }

        file_put_contents($novaServiceProvider, $contents);

        return $configuration;
    }
}
