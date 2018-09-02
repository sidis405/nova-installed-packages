<?php

namespace Strandafili\NovaInstalledPackages\Utils;

use Composed;
use Laravel\Nova\Nova;
use HaydenPierce\ClassFinder\ClassFinder;
use HaydenPierce\ClassFinder\ClassFinderException;

class NovaPackagesConfigurator
{
    protected $package;
    protected $providers;
    protected $namespaces;
    protected $loadableClasses;
    protected $configurableClasses;

    protected $allowedClassTypes = [
        'Laravel\\Nova\\Card' => 'cards',
        'Laravel\\Nova\\Tool' => 'tools',
    ];

    protected $configuration = [
        'cards' => [],
        'tools' => [],
    ];

    public function configure($package)
    {
        $this->package = $package;


        $this->providers = $this->getProviders();

        $this->namespaces = $this->getNamespacesFromProviders();

        $this->loadableClasses = $this->getClasses();

        $this->configurableClasses = $this->getConfigurableClasses();

        $this->makeConfiguration();

        return $this->configuration;
    }

    protected function makeConfiguration()
    {
        foreach ($this->configurableClasses->toArray() as $type => $className) {
            $this->configuration[$this->allowedClassTypes[$type]][] = $this->makeConfigurationItem($className, $this->allowedClassTypes[$type]);
        }
    }

    protected function makeConfigurationItem($className, $type)
    {
        $dependencies = $this->getConfigurableClassDependencies($className);
        $injectableParams = collect($dependencies)->collapse()->map(function ($val, $key) {
            return $key . ' $' . $val;
        })->implode(', ');

        $injectableString = "new \\" . $className . '(' . $injectableParams . ')';

        return [
                'className' => $className,
                'injectableString' => $injectableString,
                'dependencies' => $dependencies,
                'navigation' => ($type == 'tools') ? app()->make($className)->renderNavigation()->render(): '',
                'scripts' => $this->renderScripts($className),
            ];
    }

    protected function renderScripts($className)
    {
        app()->make($className)->boot();

        return collect(Nova::allScripts())->keys()->last();
    }

    protected function getConfigurableClassDependencies($configurableClass)
    {
        $class = new \ReflectionClass($configurableClass);

        $method = $class->getMethod("__construct");

        return collect($method->getParameters())->map(function ($param) {
            if ($param !== null && $param->getName() !== 'component') {
                return [optional($param->getType())->getName() => $param->getName()];
            }
        });
    }

    protected function getConfigurableClasses()
    {
        return $this->loadableClasses->map(function ($loadedClass) {
            return [collect(class_parents($loadedClass))->first() => $loadedClass];
        })->collapse()->filter(function ($loadedClass, $classType) {
            return in_array($classType, array_keys($this->allowedClassTypes));
        });
    }

    protected function getNamespacesFromProviders()
    {
        return $this->getProviders()->map(function ($provider) {
            return collect(explode('\\', $provider))->slice(0, 2)->implode("\\");
        });
    }

    protected function getProviders()
    {
        return collect(Composed\package($this->package)->getConfig('extra'))->pluck('providers')->flatten();
    }

    protected function getClasses()
    {
        foreach ($this->namespaces as $namespace) {
            try {
                $this->loadableClasses[] = $this->getClassFinderForPackage()::getClassesInNamespace($namespace);
            } catch (ClassFinderException $e) {
                return $e->getMessage();
            }
        }

        return collect($this->loadableClasses)->flatten();
    }

    protected function getClassFinderForPackage()
    {
        $classFinder = new ClassFinder;
        $classFinder::$appRoot = app_path() . '/../vendor/' . $this->package .  '/';

        return $classFinder;
    }
}
