<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Services\PictureService;

use App\Models\Message;
use App\Models\Match;
use App\Models\User;
use App\Models\ChatModel;

class MessageService
{
    private $pictureService;

    public function __construct()
    {
        $this->pictureService = new PictureService();
    }

    public function getMessages($uid1, $uid2)
    {
        return Message::where("from_id", $uid1)
        ->orWhere("from_id", $uid2)
        ->orWhere("to_id", $uid1)
        ->orWhere("to_id", $uid2)
        ->take(10)
        ->get();
    }

    public function sendMessages(Request $request)
    {
        $message = Message::create([
            "from_id" => $request["fromid"],
            "to_id" => $request["toid"],
            "date" => round(microtime(true) * 1000),
            "seen" => false,
            "content" => $request["content"]
        ]);
    }

    public function getMatchMessage($id)
    {
        $userIDs = $this->getMatches($id);
        $result = array();
        $i = 0;

        foreach($userIDs as $userID)
        {
            array_push($result,
                new ChatModel(
                    $i,
                    User::where("id", "=", $userID)->first()->name,
                    $this->getLastMessage($id, $userID),
                    $this->pictureService->getPictures($userID)[0]->route
                )
            );
            $i++;
        }

        return $result;
    }

    private function getLastMessage($id1, $id2)
    {
        return Message::select("content", "date", "from_id", "seen")
        ->where("from_id", $id1)->where("to_id", $id2)
        ->orWhere("from_id", $id2)->where("to_id", $id1)
        ->orderBy("date", "DESC")
        ->take(1)
        ->get();
    }

    private function getMatches($id)
    {
        $all_match = Match::where("user1_id", $id)
                        ->orWhere("user2_id", $id)
                        ->get();
        $result = array();

        foreach($all_match as $match)
        {
            if($match->user1_id == $id)
            {
                array_push($result, $match->user2_id);
            }
            else if($match->user2_id == $id)
            {
                array_push($result, $match->user1_id);
            }
        }

        return $result;
    }
}
