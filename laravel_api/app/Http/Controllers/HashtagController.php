<?php

namespace App\Http\Controllers;

use App\Models\Hashtag;
use Illuminate\Http\Request;

class HashtagController extends Controller
{
    public function index() {
        return Hashtag::orderBy('name', 'asc')
            ->take(10)
            ->get();
    }

    public function find($name) {
        return Hashtag::where('name', 'like', $name.'%')
            ->orderBy('name', 'asc')
            ->take(5)
            ->get();
    }
}
