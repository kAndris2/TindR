<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Services\NotificationService;

class NotificationController extends Controller
{
    private $nService;

    public function __construct() 
    {
        $this->nService = new NotificationService();
    }

    public function createNotice(Request $request)
    {
        $this->nService->createNotice($request);
    }

    public function updateNotice(Request $request, $id)
    {
        $this->nService->updateNotice($request, $id);
    }

    public function getNotice($id)
    {
        return $this->nService->getNotice($id);
    }
}