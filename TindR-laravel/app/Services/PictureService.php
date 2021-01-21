<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Picture;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Exceptions\NoImageException;
use App\Services\LogService;

class PictureService
{
    private $logService;
    private $noid = "No user with the given ID!";
    private $noimg = "No Image Found, cannot proceed";

    public function __construct() 
    {
        $this->logService = new LogService();
    }

    public function getPictures($id)
    {
        return Picture::where("user_id", "=", $id)->orderBy('upload_date', 'asc')->get();
    }

    public function addPicture(Request $request, $id)
    {
        $check = true;

        try {
            $user = User::findOrFail($id);
            $encoded = $request["img_raw"];
            if ($encoded == '' ){
                $check = false;
                throw new NoImageException("No Image Uploaded, cannot proceed");
            }
            
            Picture::create([
                "user_id" => $id,
                "upload_date" =>round(microtime(true) * 1000),
                "route" => $encoded
            ]);

            $toObj = array(
                "status" => "success",
                "details" => array("user" => $user)
            );

            return json_encode($toObj);
        }
        catch (ModelNotFoundException $e){
            $toObj = array(
                "status" => "error",
                "message" => array("readable" => $this->noid,"exception" => $e->getMessage())
            );
            $check = false;
            return json_encode($toObj);
        }
        catch (NoImageException $c){
            $toObj = array(
                "status" => "img_error",
                "message" => strval($c)
            );
            $check = false;
            return json_encode($toObj);
        }
        finally {
            $this->logService->createLog([
                "user_id" => $id,
                "content" => $check == true ? "Successful image upload" : "Image upload failed"
            ]);
        }
    }

    public function deletePicture(Request $request, $id)
    {
        $check = true;

        try {
            $user = User::findOrFail($id);
            $encoded = $request["del_data"];
            if ($encoded == '' ){
                $check = false;
                throw new NoImageException($this->noimg);
            }
            
            Picture::where([
                ['user_id', '=', $id],
                ['route', '=', $encoded],
            ])->delete();

            $toObj = array(
                "status" => "success",
                "details" => array("user" => $user)
            );
            return json_encode($toObj);
        }
        catch (ModelNotFoundException $e){
            $toObj = array(
                "status" => "error",
                "message" => array("readable" => $this->noid,"exception" => $e->getMessage())
            );
            $check = false;
            return json_encode($toObj);
        }
        catch (NoImageException $c){
            $toObj = array(
                "status" => "img_error",
                "message" => strval($c)
            );
            $check = false;
            return json_encode($toObj);
        }
        finally {
            $this->logService->createLog([
                "user_id" => $id,
                "content" => $check == true ? "Successful image deletion" : "Failed to delete image"
            ]);
        }
    }

    public function setMainPic(Request $request, $id)
    {
        $check = true;

        try {
            $user = User::findOrFail($id);
            
            $images = Picture::where("user_id", "=", $id)->get();

            $prevmillis=0;
            
            foreach ($images as $key => $value) {
                if ($request["pic_id"] == $value->id){
                    $prevmillis = $value->upload_date;
                    $toUpdate = Picture::where("user_id","=",$id)->orderBy('upload_date', 'asc')->first();
                    $toUpdate->update(['upload_date' => round(microtime(true) * 1000)]);
                    Picture::find($request["pic_id"])->update(['upload_date' => 1600000000000]);
                }
                
            }

            
        }
        catch (ModelNotFoundException $e){
            $toObj = array(
                "status" => "error",
                "message" => array("readable" => $this->noid,"exception" => $e->getMessage())
            );
            $check = false;
            return json_encode($toObj);
        }
        catch (NoImageException $c){
            $toObj = array(
                "status" => "img_error",
                "message" => strval($c)
            );
            $check = false;
            return json_encode($toObj);
        }
        finally {
            $this->logService->createLog([
                "user_id" => $id,
                "content" => $check == true ? "Successful profile picture setting" : "Failed profile picture setting"
            ]);
        }
    }
}
