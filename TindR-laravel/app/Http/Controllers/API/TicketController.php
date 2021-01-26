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

    public function updateTicket(Request $request, $id) 
    {
        Ticket::find($id)->update($request->all());

        $this->logService->createLog([
            "user_id" => $request["solver_id"],
            "content" => $request["solved"] == true ? "Solved an error (" . $request["id"] . ")" : "Re-opened an error (" . $request["id"] . ")"
        ]);
        return $this->getAllTickets();
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