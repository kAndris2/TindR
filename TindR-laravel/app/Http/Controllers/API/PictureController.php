<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PictureService;

class PictureController extends Controller
{
    private $pictureService;

    public function __construct()
    {
        $this->pictureService = new PictureService();
    }

    public function getPictures($id)
    {
        return $this->pictureService->getPictures($id);
    }

    public function addPicture(Request $request, $id)
    {
        return $this->pictureService->addPicture($request, $id);    
    }

    public function deletePicture(Request $request, $id)
    {
        return $this->pictureService->deletePicture($request, $id);
    }

    public function setMainPic(Request $request, $id)
    {
        return $this->pictureService->setMainPic($request, $id);
    }
}
