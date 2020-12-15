<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Picture;

class PictureController extends Controller
{
    public function getPictures($id)
    {
        return Picture::where("user_id", "=", $id)->get();      
    }
}
