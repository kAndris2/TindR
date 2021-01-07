<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Picture;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Exceptions\NoImageException;

class PictureController extends Controller
{
    public function getPictures($id)
    {
        return Picture::where("user_id", "=", $id)->get();      
    }

    public function addPicture(Request $request, $id){
        try {
            $user = User::findOrFail($id);
            $encoded = $request["img_raw"];
            if ($encoded == '' ){
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
                "message" => array("readable" => "No user with the given ID!","exception" => $e->getMessage())
            );
            return json_encode($toObj);
        }
        catch (NoImageException $c){
            $toObj = array(
                "status" => "imaerror",
                "message" => $c
            );
            return json_encode($toObj);
        }
        
    }

    public function deletePicture(Request $request, $id){
        try {
            $user = User::findOrFail($id);
            $encoded = $request["del_data"];
            if ($encoded == '' ){
                throw new NoImageException("No Image Found, cannot proceed");
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
                "message" => array("readable" => "No user with the given ID!","exception" => $e->getMessage())
            );
            return json_encode($toObj);
        }
        catch (NoImageException $c){
            $toObj = array(
                "status" => "imaerror",
                "message" => $c
            );
            return json_encode($toObj);
        }
        
    }
}
