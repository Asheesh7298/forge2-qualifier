<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\BoardListController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;

Route::apiResource('boards', BoardController::class);
Route::post('lists', [BoardListController::class, 'store']);
Route::put('lists/{boardList}', [BoardListController::class, 'update']);
Route::delete('lists/{boardList}', [BoardListController::class, 'destroy']);
Route::post('cards', [CardController::class, 'store']);
Route::put('cards/{card}', [CardController::class, 'update']);
Route::delete('cards/{card}', [CardController::class, 'destroy']);
Route::post('cards/{card}/tags', [CardController::class, 'attachTag']);
Route::apiResource('tags', TagController::class)->only(['index', 'store']);
Route::apiResource('members', MemberController::class)->only(['index', 'store']);