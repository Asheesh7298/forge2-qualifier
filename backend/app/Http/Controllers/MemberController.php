<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        return Member::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string', 'email' => 'required|email']);
        return Member::create($data);
    }
}