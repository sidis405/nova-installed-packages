<?php

namespace Strandafili\NovaInstalledPackages\Http\Controllers;

use Illuminate\Routing\Controller;
use Strandafili\NovaInstalledPackages\Utils\ComposerStatus;

class ComposerController extends Controller
{
    protected $status;

    public function __construct(ComposerStatus $status)
    {
        $this->status = $status;
    }

    public function show()
    {
        return $this->status->show();
    }

    public function reset()
    {
        return $this->status->reset();
    }
}
