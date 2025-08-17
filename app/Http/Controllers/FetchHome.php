<?php

namespace App\Http\Controllers;

use App\Common\Controller;

class FetchHome extends Controller
{
    public function __invoke()
    {
        return $this->inertia('home', [
            //
        ]);
    }
}
