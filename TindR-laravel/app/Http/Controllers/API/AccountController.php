<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

        setcookie("userid", $newAccountId, time() + 86400, "/");

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
        $account = Account::where("email", "=", $request["email"])->first();
        if ($account != null)
        {
            if ($account->password == $request["password"])
            {
                //setcookie("userid", $account->id, time() + 86400, "/");
                $resp = new Response(User::find($account->id));
                $resp = $resp->withCookie(cookie('userid', '2000', 3));
                return $resp;
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
