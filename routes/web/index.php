<?php

use App\Http\Controllers\FetchHome;
use Illuminate\Support\Facades\Route;

Route::get('/', FetchHome::class);
