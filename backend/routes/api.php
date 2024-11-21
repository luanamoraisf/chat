<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/oauth/token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');
Route::post('/oauth/token/refresh', '\Laravel\Passport\Http\Controllers\TransientTokenController@refresh');
Route::get('/oauth/authorize', '\Laravel\Passport\Http\Controllers\AuthorizationController@authorize');
Route::delete('/oauth/token/revoke', '\Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@destroy');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/token', [AuthController::class, 'createAccessToken']);

Route::post('/create/user', [UserController::class, 'store']);

Route::get('/index/user', [UserController::class, 'index']);