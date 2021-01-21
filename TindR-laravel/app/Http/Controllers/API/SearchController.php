<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Search;
use App\Services\LogService;

class SearchController extends Controller
{
    private $logService;

    public function __construct() 
    {
        $this->logService = new LogService();
    }

    public function getProfileData($id) 
    {
        return Search::find($id);
    }

    public function updateSearch(Request $request, $id)
    {
        Search::find($id)->update($request->all());

        $this->logService->createLog([
            "user_id" => $id,
            "content" => "Search criteria changed"
        ]);
    }
}
