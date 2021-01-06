<?php

namespace App\Services;

use App\Models\Picture;
use App\Models\User;
use App\Models\Search;

class RecommendationService
{
    public function getRecommendations($id)
    {
        $users = $this->getUsersWhoMeetsSearchCondition($id);
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
        return json_encode($recoms);
    }

    private function getUsersWhoMeetsSearchCondition($id)
    {
        $search = Search::find($id);
        $users = User::where("id", "!=", $id)->get();
        $result = array();
        $MAX_SCORE = 2;

        foreach($users as $u)
        {
            $score = 0;
            $age = $this->ageCalculate($u->birthdate);

            if ($u->gender == $search->looking_for || $u->gender == null) $score++;
            if ($age >= $search->min_age && $age <= $search->max_age) $score++;

            if($score == $MAX_SCORE)
            {
                array_push($result, $u);
            }
        }
        return $result;
    }

    private function ageCalculate($milli) 
    {
        return date('Y') - date('Y', $milli / 1000);
    }
}
