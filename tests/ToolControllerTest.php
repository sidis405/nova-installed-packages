<?php

namespace Strandafili\NovaInstalledPackages\Tests;

use Strandafili\NovaInstalledPackages\Http\Controllers\ToolController;
use Strandafili\NovaInstalledPackages\:namespace_tool_name;
use Symfony\Component\HttpFoundation\Response;

class ToolControllerTest extends TestCase
{
    /** @test */
    public function it_can_can_return_a_response()
    {
        $this->get('nova-vendor/sidis405/nova-installed-packages')
            ->assertSuccessful();
    }
}
