<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\SearchController;
use App\Http\Controllers\API\LikeController;
use App\Http\Controllers\API\PictureController;

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
Route::get("recommendations/{id}", [UserController::class, 'getRecommendations']);

Route::get("profile_data/{id}", [SearchController::class, 'getProfileData']);
Route::put("update_search/{id}", [SearchController::class, "updateSearch"]);

Route::put("account/{id}", [AccountController::class, "getAccountById"]);
Route::post("register", [AccountController::class, "register"]);
Route::post("login", [AccountController::class, "login"]);
Route::post("logout", [AccountController::class, "logout"]);
Route::put("update_account/{id}", [AccountController::class, "updateAccount"]);
Route::delete("delete_account/{id}", [AccountController::class, "deleteAccount"]);
Route::get("valid_email/{email}", [AccountController::class, "isValidEmail"]);

Route::post("add_like", [LikeController::class, "addLike"]);
Route::post("add_dislike", [LikeController::class, "addDislike"]);

Route::post("pictures/{id}", [PictureController::class, "getPictures"]);