<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\MessageService;

use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{
    private $messageService;

    public function __construct()
    {
        $this->messageService = new MessageService();
    }

    public function getMessages($uid1, $uid2)
    {
        return $this->messageService->getMessages($uid1, $uid2);
    }

    public function sendMessages(Request $request)
    {
        $this->messageService->sendMessages($request);
    }

    public function getMatchMessage($id)
    {
        return $this->messageService->getMatchMessage($id);
    }
}
