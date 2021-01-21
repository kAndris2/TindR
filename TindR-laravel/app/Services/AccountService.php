<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;
use App\Models\Account;
use App\Models\User;
use App\Models\Picture;
use Illuminate\Http\Request;
use App\Services\LogService;

class AccountService 
{
    private $logService;

    public function __construct()
    {
        $this->logService = new LogService();
    }

    public function getAccountById($id) 
    {
        return Account::find($id);
    }

    public function register(Request $request) 
    {
        $newAccountId = Account::create([
            "email" => $request["email"],
            "password" => Hash::make($request["password"]),
            "phone_number" => $request["phone_number"]
        ])->id;

        $newUser = User::create([
            "id" => $newAccountId,
            "name" => $request["name"],
            "birthdate" => $request["birthdate"],
            "passion" => $request["passion"]
        ]);

        Picture::create([
            "user_id" => $newAccountId,
            "upload_date" => round(microtime(true) * 1000),
            "route" => $request["rawImage"]
        ]);

        $this->logService->createLog([
            "user_id" => $newAccountId,
            "content" => "Registration"
        ]);

        return $newUser;
    }

    public function login(Request $request)
    {
        $account = Account::where("email", "=", $request["email"])->first();

        $this->logService->createLog([
            "user_id" => $account->id,
            "content" => $account != null ? "Login" : "Login failed"
        ]);

        if ($account != null && (Hash::check($request["password"], $account->password)))
        {
            return User::find($account->id);
        }
    
        return null;
    }

    public function updateAccount(Request $request, $id)
    {
        Account::find($id)->update($request->all());

        $this->logService->createLog([
            "user_id" => $id,
            "content" => "Account updated"
        ]);
    }

    public function deleteAccount($id)
    {
        Account::find($id)->delete();
    }

    public function isValidEmail($email) 
    {
        return Account::where("email", "=", $email)->first();
    }

    public function getDetails($id)
    {
        $account = Account::where("id", "=", $id)->first();

        return array(
            'email' => $account->email,
            'phone_number' => $account->phone_number
        );
    }

    public function savePosition($id, Request $request) 
    {
        Account::find($id)->update($request->all());
    }
}