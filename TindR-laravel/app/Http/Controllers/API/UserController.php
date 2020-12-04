<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Search;
use App\Models\Match;
use App\Models\Like;
use App\Models\Dislike;

class UserController extends Controller
{
    public function getUsers() 
    {
        return User::all();
    }

    public function getUserById($id)
    {
        return User::find($id);
    }

    public function updateUser(Request $request, $id)
    {
        User::find($id)->update($request->all());
    }

    public function getRecommendations($id)
    {
        //$recommendations = array();
        $users = User::where("id", "!=", $id)->first();
        /*
        $searches = Search::all();
        $matches = Match::all();
        $likes = Like::all();
        $dislikes = Dislike::all();
        */
        return $users;
    }
}
