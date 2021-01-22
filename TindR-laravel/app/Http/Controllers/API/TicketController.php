<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Services\LogService;

class TicketController extends Controller
{
    private $logService;

    public function __construct()
    {
        $this->logService = new LogService();
    }

    public function createTicket(Request $request)
    {
        $id = Ticket::create([
            "notifier_id" => $request["notifier_id"],
            "solved" => false,
            "date" => round(microtime(true) * 1000),
            "subject" => $request["subject"],
            "section" => $request["section"],
            "steps" => $request["steps"]
        ])->id;

        $this->logService->createLog([
            "user_id" => $request["notifier_id"],
            "content" => "Created an error ticket (" . $id . ")"
        ]);
    }

    public function updateTicket($id, $ticketid) 
    {
        Ticket::find($ticketid)->update(["solved" => true]);

        $this->logService->createLog([
            "user_id" => $id,
            "content" => "Solved an error (" . $ticketid . ")"
        ]);
    }

    public function getTickets($id)
    {
        return Ticket::where("notifier_id", "=", $id)->get();
    }

    public function getAllTickets()
    {
        return Ticket::all();
    }
}