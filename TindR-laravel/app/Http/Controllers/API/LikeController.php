<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\VoteService;

class LikeController extends Controller
{
    public $voteService;

    public function __construct() {
        $this->voteService = new VoteService();
    }

    public function manageLikes(Request $request)
    {
        $this->voteService->manageVote(
            $request["receiverid"],
            $request["giverid"],
            $request["direction"]
        );
    }
}
