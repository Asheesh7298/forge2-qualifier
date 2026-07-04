<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Card extends Model
{
    protected $fillable = ['title', 'description', 'board_list_id', 'member_id', 'due_date', 'position'];

    protected $casts = ['due_date' => 'date'];

    public function boardList(): BelongsTo
    {
        return $this->belongsTo(BoardList::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}