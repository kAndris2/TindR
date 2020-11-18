<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Dislike;
use App\Models\Match;

class LikeController extends Controller
{
    public function addLike($giver, $receiver)
    {
        $like = Like::where("owner_id", "=", $receiver)->where("receiver_id", "=", $giver)->firstOrFail();
        if ($like != null)
        {
            $like->delete();
            Match::create([
                "user1_id" => $giver,
                "user2_id" => $receiver,
                "date" => round(microtime(true) * 1000)
            ]);
        }
        else
        {
            Like::create([
                "owner_id" => $giver,
                "receiver_id" => $receiver
            ]);
        }
    }

    public function addDislike($giver, $receiver)
    {
        Dislike::create([
            "owner_id" => $giver,
            "receiver_id" => $receiver,
            "date" => round(microtime(true) * 1000)
        ]);
    }
}
