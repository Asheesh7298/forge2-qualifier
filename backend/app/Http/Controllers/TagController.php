<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return Tag::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string', 'color' => 'nullable|string']);
        return Tag::create($data);
    }
}