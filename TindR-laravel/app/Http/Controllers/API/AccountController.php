<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;
use App\Models\Account;
use App\Models\User;

class AccountController extends Controller
{
    public function getAccountById($id) 
    {
        return Account::find($id);
    }

    public function register(Request $request) 
    {
        $newAccountId = Account::create([
            "email" => $request["email"],
            "password" => $request["password"],
            "phone_number" => $request["phone_number"]
        ])->id;

        $newUser = User::create([
            "id" => $newAccountId,
            "name" => $request["name"],
            "birthdate" => $request["birthdate"],
            "passion" => $request["passion"]
        ]);

        return $newUser;
    }

    public function login(Request $request, Response $response)
    {
        $account = Account::where("email", "=", $request["email"])->first();

        if ($account != null)
        {
            if ($account->password === $request["password"])
            {
                return User::find($account->id);
            }
        }
    
        return null;
    }

    public function logout()
    {
        setcookie("userid", "", time() - 3600);
    }

    public function updateAccount(Request $request, $id)
    {
        Account::find($id)->update($request->all());
    }

    public function deleteAccount($id)
    {
        Account::find($id)->delete();
    }

    public function isValidEmail($email) 
    {
        $account = Account::where("email", "=", $email)->first();
        return $account;
    }
}
