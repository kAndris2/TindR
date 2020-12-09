<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getPin(Request $request)
    {
        if($request["phone"] == null){
            $e = json_encode(array("error"=>"phone cannot be empty"));
            return $e;
        }
        
        $phnum=urlencode($request["phone"]);
        $aikey=urlencode($request["apikey"]);
		$ch = curl_init("http://api.ringcaptcha.com/v2/apps/".$request['appkey']."/captcha/sms");
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS,"phone=".$phnum."&api_key=".$aikey."");
		$response = curl_exec($ch);
    	curl_close($ch);
        return $response;
    }

    public function validateCode(Request $request){
        if($request["code"] == null){
            $e = json_encode(array("error"=>"phone cannot be empty"));
            return $e;
        }
        $phnum=urlencode($request["phone"]);
        $code=urlencode($request["code"]);
        $aikey=urlencode($request["apikey"]);
		$ch = curl_init("http://api.ringcaptcha.com/".$request['appkey']."/verify");
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS,"phone=".$phnum."&api_key=".$aikey."&code=".$code."");
		$response = curl_exec($ch);
    	curl_close($ch);
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
