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

        //setcookie("userid", $newAccountId, time() + 86400, "/");

        $newUser = User::create([
            "id" => $newAccountId,
            "name" => $request["name"],
            "birthdate" => $request["birthdate"],
            "passion" => $request["passion"]
        ]);

        $response = new Response($newUser);
        $response->withCookie(cookie()->forever('userid', $newAccountId));

        return $response;
    }

    public function login(Request $request, Response $response)
    {
        $account = Account::where("email", "=", $request["email"])->first();

        if ($account != null)
        {
            if ($account->password === $request["password"])
            {
                $response = new Response(User::find($account->id));
                $response->withCookie(cookie('userid', $account->id, time() + 86400,null,null,false,true,false,'none'));
                return $response;
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
