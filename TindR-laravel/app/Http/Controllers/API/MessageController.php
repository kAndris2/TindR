<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{
    public function getMessages($uid1, $uid2)
    {
        $messages = Messages::all();
        $ids = array($uid1, $uid2);
        $result = array();

        foreach($messages as $message)
        {
            if(in_array($message->from_id, $ids, TRUE) || in_array($message->to_id, $ids, TRUE)) 
            {
                array_push($result, $message);
            } 
        }

        return $result;
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
}
