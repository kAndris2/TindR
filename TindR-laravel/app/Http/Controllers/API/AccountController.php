<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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

        //setcookie("userid", $newAccountId, time() + 86400, "/");

        $newUser = User::create([
            "id" => $newAccountId,
            "name" => $request["name"],
            "birthdate" => $request["birthdate"],
            "passion" => $request["passion"]
        ]);

        return $newUser;
    }

    public function login(Request $request)
    {
        $account = Account::where("email", "=", $request["email"]);
        if ($account != null)
        {
            if ($account->password == $request["password"])
            {
                setcookie("userid", $account->id, time() + 86400, "/");
                return User::find($account->id);
            }
            // else return error model!
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
}
