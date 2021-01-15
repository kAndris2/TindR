<?php

namespace App\Services;

use App\Models\Like;
use App\Models\Dislike;
use App\Models\Match;

class VoteService
{
    public function manageVote($receiverID, $giverID, $direction) 
    {
        $direction == 1 ? 
            $this->createLike($receiverID, $giverID) 
            : 
            $this->createDislike($receiverID, $giverID);
    }

    function createLike($receiverID, $giverID)
    {
        $like = Like::where("owner_id", "=", $receiverID)->where("receiver_id", "=", $giverID)->first();
        if ($like != null)
        {
            $like->delete();
            Match::create([
                "user1_id" => $giverID,
                "user2_id" => $receiverID,
                "date" => round(microtime(true) * 1000)
            ]);
        }
        else
        {
            Like::create([
                "owner_id" => $giverID,
                "receiver_id" => $receiverID
            ]);
        }
    }

    function createDislike($receiverID, $giverID)
    {
        Dislike::create([
            "owner_id" => $giverID,
            "receiver_id" => $receiverID,
            "date" => round(microtime(true) * 1000)
        ]);
    }
}
