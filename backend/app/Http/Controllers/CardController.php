<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'board_list_id' => 'required|exists:board_lists,id',
            'member_id' => 'nullable|exists:members,id',
            'due_date' => 'nullable|date',
            'position' => 'nullable|integer',
        ]);
        return Card::create($data);
    }

    public function update(Request $request, Card $card)
    {
        $data = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'nullable|string',
            'board_list_id' => 'sometimes|exists:board_lists,id',
            'member_id' => 'nullable|exists:members,id',
            'due_date' => 'nullable|date',
            'position' => 'sometimes|integer',
        ]);
        $card->update($data);
        return $card->load('tags', 'member');
    }

    public function destroy(Card $card)
    {
        $card->delete();
        return response()->noContent();
    }

    public function attachTag(Request $request, Card $card)
    {
        $data = $request->validate(['tag_id' => 'required|exists:tags,id']);
        $card->tags()->syncWithoutDetaching([$data['tag_id']]);
        return $card->load('tags');
    }
}