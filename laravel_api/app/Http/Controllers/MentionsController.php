<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class MentionsController extends Controller
{
    public function index() {
        return User::orderBy('name', 'asc')
            ->take(10)
            ->pluck('name');
    }

    public function find($name) {
        return User::where('name', 'like', $name.'%')
            ->orderBy('name', 'asc')
            ->take(5)
            ->pluck('name');
    }
}
