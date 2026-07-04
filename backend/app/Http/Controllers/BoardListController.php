<?php

namespace App\Http\Controllers;

use App\Models\BoardList;
use Illuminate\Http\Request;

class BoardListController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'board_id' => 'required|exists:boards,id',
            'position' => 'nullable|integer',
        ]);
        return BoardList::create($data);
    }

    public function update(Request $request, BoardList $boardList)
    {
        $data = $request->validate(['name' => 'sometimes|string', 'position' => 'sometimes|integer']);
        $boardList->update($data);
        return $boardList;
    }

    public function destroy(BoardList $boardList)
    {
        $boardList->delete();
        return response()->noContent();
    }
}