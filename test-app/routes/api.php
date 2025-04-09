<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ArticleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/users', [AuthenticationController::class, 'register']);

Route::post('/users/login', [AuthenticationController::class, 'authentication']);

Route::post('/users/logout', [AuthenticationController::class, 'logout']);

Route::post('/articles', [ArticleController::class, 'store']);

Route::get('/articles', [ArticleController::class, 'index']);

Route::put('/articles/{slug}', [ArticleController::class, 'update']);

Route::delete('/articles/{slug}', [ArticleController::class, 'destroy']);