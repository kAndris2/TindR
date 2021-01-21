<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\LogService;

class NotificationService
{
    private $logService;

    public function __construct() 
    {
        $this->logService = new LogService();
    }

    public function createNotice(Request $request)
    {
        Notification::create([
            "user_id" => $request["user_id"],
            "seen" => $request["seen"],
            "date" => round(microtime(true) * 1000),
            "content" => $request["content"]
        ]);
    }

    public function updateNotice(Request $request, $id)
    {
        Notification::find($id)->update($request->all());
    }

    public function getNotice($id)
    {
        return Notification::where("user_id", "=", $id)->get();
    }

    public function createMatchNotice($uID1, $uID2)
    {
        $request = new Request();
        $request->replace([
            "user_id" => $uID1,
            "seen" => false,
            "date" => round(microtime(true) * 1000),
            "content" => "Successful match with " . $this->getUserNamebyId($uID2)
        ]);
        $this->createNotice($request);

        $this->logService->createLog([
            "user_id" => $uID1,
            "content" => "Matched with " . $this->getUserNamebyId($uID2)
        ]);
    }

    private function getUserNamebyId($id)
    {
        $user = User::find($id);
        return $user->name . "(" . $id . ")";
    }

    public function createLikeNotice($id)
    {
        $request = new Request();
        $request->replace([
            "user_id" => $id,
            "seen" => false,
            "date" => round(microtime(true) * 1000),
            "content" => "Somebody likes you!"
        ]);
        $this->createNotice($request);

        $this->logService->createLog([
            "user_id" => $uID1,
            "content" => "Sent like to " . $this->getUserNamebyId($uID2)
        ]);
    }

    public function createDislikeLog($giverId, $receiverID)
    {
        $this->logService->createLog([
            "user_id" => $giverId,
            "content" => "Sent dislike to " . $this->getUserNamebyId($receiverID)
        ]);
    }
}
