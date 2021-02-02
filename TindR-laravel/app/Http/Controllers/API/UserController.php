<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\RecommendationService;
use App\Services\LogService;

class UserController extends Controller
{
    private $recomService;
    private $logService;

    public function __construct() {
        $this->recomService = new RecommendationService();
        $this->logService = new LogService();
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

        $this->logService->createLog([
            "user_id" => $id,
            "content" => "Profile updated"
        ]);
    }

    public function getRecommendations($id)
    {
        return $this->recomService->getRecommendations($id);
    }
}
