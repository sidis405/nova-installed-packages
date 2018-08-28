# Nova Installed Packages

A tool that shows nova-specific packages installed on your application.

Since everyone is hella excited about Nova and installing all sorts of packages, this tool allows us to keep an eye on installed packages and see a detailed page of istructions straight from the NovaPackages api :)

Happy coding!

<img src="https://github.com/sidis405/nova-installed-packages/blob/master/screenshots/index.png?raw=true">

<img src="https://github.com/sidis405/nova-installed-packages/blob/master/screenshots/show.png?raw=true">
.
## Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require sidis405/nova-installed-packages
```

Next up, you must register the tool with Nova. This is typically done in the `tools` method of the `NovaServiceProvider`.

```php
// in app/Providers/NovaServiceProvider.php

// ...

public function tools()
{
    return [
        // ...
        new \Strandafili\NovaInstalledPackages\Tool(),
    ];
}
```

## Usage

Click on the "Installed Packages" menu item in your Nova app to see the tool provided by this package.

### Testing

``` bash
composer test
```

### Security

If you discover any security related issues, please email forge405@gmail.com instead of using the issue tracker.

## Credits

- [Sidrit Trandafili](https://github.com/sidis405)

## Big Thanks

- [Spatie](https://github.com/spatie) for making the wonderful tool template
- [TighenCo](https://github.com/tightenco) for the novapackages.com API

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
