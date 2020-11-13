<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AccountController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/us', function (Request $request) {
    return $request->user();
});

Route::get("users", [UserController::class, 'getUsers']);
Route::get("user/{id}", [UserController::class, 'getUserById']);
Route::put("update_user/{id}", [UserController::class, 'updateUser']);

Route::post("register", [AccountController::class, "register"]);
Route::post("login", [AccountController::class, "login"]);
Route::post("logout", [AccountController::class, "logout"]);
Route::put("update_account/{id}", [AccountController::class, "updateAccount"]);
Route::delete("delete_account/{id}", [AccountController::class, "deleteAccount"]);