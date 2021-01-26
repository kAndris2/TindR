<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\SearchController;
use App\Http\Controllers\API\LikeController;
use App\Http\Controllers\API\PictureController;
use App\Http\Controllers\API\PinController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\TicketController;

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
Route::get("profiles/{id}", [UserController::class, 'getRecommendations']);

Route::get("profile_data/{id}", [SearchController::class, 'getProfileData']);
Route::put("update_search/{id}", [SearchController::class, "updateSearch"]);

Route::put("account/{id}", [AccountController::class, "getAccountById"]);
Route::post("register", [AccountController::class, "register"]);
Route::post("login", [AccountController::class, "login"]);
Route::post("logout", [AccountController::class, "logout"]);
Route::post("save_position/{id}", [AccountController::class, "savePosition"]);
Route::put("update_account/{id}", [AccountController::class, "updateAccount"]);
Route::delete("delete_account/{id}", [AccountController::class, "deleteAccount"]);
Route::get("valid_email/{email}", [AccountController::class, "isValidEmail"]);
Route::get("details/{id}", [AccountController::class, "getDetails"]);

Route::post("give_vote", [LikeController::class, "manageLikes"]);

Route::get("pictures/{id}", [PictureController::class, "getPictures"]);
Route::post("pictures/upload/{id}", [PictureController::class, "addPicture"]);
Route::post("pictures/delete/{id}", [PictureController::class, "deletePicture"]);
Route::post("pictures/setmain/{id}", [PictureController::class, "setMainPic"]);

Route::post("getpin", [PinController::class, "getPin"]);
Route::post("validatecode", [PinController::class, "validateCode"]);

Route::post("create_notifications", [NotificationController::class, 'createNotice']);
Route::put("update_notifications/{id}", [NotificationController::class, 'updateNotice']);
Route::get("get_notifications/{id}", [NotificationController::class, 'getNotice']);

Route::post("create_ticket", [TicketController::class, 'createTicket']);
Route::put("update_ticket/{id}", [TicketController::class, 'updateTicket']);
Route::get("get_tickets/{id}", [TicketController::class, 'getTickets']);
Route::get("get_all_tickets", [TicketController::class, 'getAllTickets']);
