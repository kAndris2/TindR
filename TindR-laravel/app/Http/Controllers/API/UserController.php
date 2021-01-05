<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\RecommendationService;

class UserController extends Controller
{

    public $recomService;

    public function __construct() {
        $this->recomService = new RecommendationService();
    }

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
        return $this->recomService->getRecommendations($id);
    }
}
