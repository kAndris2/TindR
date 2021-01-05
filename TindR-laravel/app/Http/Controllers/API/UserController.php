<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Search;
use App\Models\Match;
use App\Models\Like;
use App\Models\Dislike;

use App\Models\Picture;
use App\Models\Profile;

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
        $users = User::where("id", "!=", $id)->get();
        /*
        $searches = Search::all();
        $matches = Match::all();
        $likes = Like::all();
        $dislikes = Dislike::all();
        */
        return $users;
    }

    public function getRecom2($id)
    {
        $users = User::where("id", "!=", $id)->get();
        $imgs = Picture::where("user_id", "!=", $id)->get();
        $recoms = array();

        foreach($users as $u)
        {
            $img_temp = array();
            foreach($imgs as $img)
            {
                array_push($img_temp, $img->route);
            }
            array_push($recoms,
                array(
                    //'id' => $u->id,
                    'name' => $u->name,
                    'age' => $u->birthdate,
                    'distance' => '3 miles away',
                    'text' => $u->description,
                    'pics' => $img_temp,
                    'anthem' => $u->anthem
                )
            );
        }

        return $recoms;
    }
}
