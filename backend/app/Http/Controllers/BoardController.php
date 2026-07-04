<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function index()
    {
        return Board::with('boardLists.cards')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string', 'description' => 'nullable|string']);
        return Board::create($data);
    }

    public function show(Board $board)
    {
        return $board->load('boardLists.cards.tags', 'boardLists.cards.member');
    }

    public function update(Request $request, Board $board)
    {
        $data = $request->validate(['name' => 'sometimes|string', 'description' => 'nullable|string']);
        $board->update($data);
        return $board;
    }

    public function destroy(Board $board)
    {
        $board->delete();
        return response()->noContent();
    }
}