<?php

namespace App\Services;

use App\Models\Picture;
use App\Models\Profile;
use App\Models\User;

class RecommendationService
{
    public function getRecommendations($id)
    {
        $users = User::where("id", "!=", $id)->get();
        $imgs = Picture::where("user_id", "!=", $id)->get();
        $recoms = array();

        foreach($users as $u)
        {
            $img_temp = array();
            foreach($imgs as $img)
            {
                if($img->user_id == $u->id)
                {
                    array_push($img_temp, $img->route);
                }
            }
            array_push($recoms,
                array(
                    'id' => $u->id,
                    'name' => $u->name,
                    'age' => $u->birthdate,
                    'distance' => '3 miles away',
                    'text' => $u->description,
                    'pics' => $img_temp,
                    'anthem' => $u->anthem
                )
            );
        }

        return $recoms;
    }
}
