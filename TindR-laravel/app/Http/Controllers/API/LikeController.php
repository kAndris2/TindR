<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Dislike;
use App\Models\Match;

class LikeController extends Controller
{
    public function addLike(Request $request)
    {
        $like = Like::where("owner_id", "=", $request["receiverid"])->where("receiver_id", "=", $request["giverid"])->first();
        var_dump($like);
        if ($like != null)
        {
            $like->delete();
            Match::create([
                "user1_id" => $request["giverid"],
                "user2_id" => $request["receiverid"],
                "date" => round(microtime(true) * 1000)
            ]);
        }
        else
        {
            Like::create([
                "owner_id" => $request["giverid"],
                "receiver_id" => $request["receiverid"]
            ]);
        }
    }

    public function addDislike(Request $request)
    {
        Dislike::create([
            "owner_id" => $request["giverid"],
            "receiver_id" => $request["receiverid"],
            "date" => round(microtime(true) * 1000)
        ]);
    }
}
