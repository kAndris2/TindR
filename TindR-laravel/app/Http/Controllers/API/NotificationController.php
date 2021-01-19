<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
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
}