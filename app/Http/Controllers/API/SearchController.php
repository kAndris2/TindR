<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\User;
use App\Models\Account;
use App\Models\Search;

class SearchController extends Controller
{
    public function getProfileData($id) 
    {
        return Search::find($id);
    }

    public function updateSearch(Request $request, $id)
    {
        Search::find($id)->update($request->all());
    }
}
