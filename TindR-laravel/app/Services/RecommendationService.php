<?php

namespace App\Services;

use App\Models\Picture;
use App\Models\User;
use App\Models\Search;
use App\Models\Like;
use App\Models\Dislike;
use App\Models\Match;
use App\Models\Account;

class RecommendationService
{
    public function getRecommendations($id)
    {
        $users = $this->getUsersWhoMeetsSearchCondition($id);
        $imgs = Picture::where("user_id", "!=", $id)->orderBy('upload_date', 'asc')->get();
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
                    'distance' => $this->calculateDistance($id, $u->id) . ' kilometres away',
                    'text' => $u->description,
                    'pics' => $img_temp,
                    'anthem' => $u->anthem,
                    'user' => User::find($u->id)
                )
            );
        }
        return json_encode($recoms);
    }

    private function calculateDistance($from_id, $to_id)
    {
       $user1 = Account::find($from_id);
       $user2 = Account::find($to_id); 
       $earthRadius = 6371000;
        //var_dump($user1);
       // convert from degrees to radians
        $latFrom = deg2rad($user1->latitude);
        $lonFrom = deg2rad($user1->longitude);

        $latTo = deg2rad($user2->latitude);
        $lonTo = deg2rad($user2->longitude);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        return round( ($angle * $earthRadius) / 1000, 0);
    }

    private function getUsersWhoMeetsSearchCondition($id)
    {
        $search = Search::find($id);
        $users = User::where("id", "!=", $id)->get();
        $result = array();
        $MAX_SCORE = 3;

        foreach($users as $u)
        {
            if($this->isUserStatusPublic($u->id))
            {
                if ($this->isNotVoted($id, $u->id))
                {
                    $score = 0;
                    $age = $this->ageCalculate($u->birthdate);

                    if($this->calculateDistance($id, $u->id) <= $search->max_distance) $score++;
                    if ($age >= $search->min_age && $age <= $search->max_age) $score++;
                    if($search->looking_for == "Everyone") {
                        $score++;
                    }
                    else
                    {
                        if ($u->gender == $search->looking_for || $u->gender == null) $score++;
                    }

                    if($score == $MAX_SCORE)
                    {
                        array_push($result, $u);
                    }
                }
            }
        }
        return $result;
    }

    private function ageCalculate($milli) 
    {
        return date('Y') - date('Y', $milli / 1000);
    }

    private function isUserStatusPublic($id)
    {
        $search = Search::find($id);
        return $search->status == true;
    }

    private function isNotVoted($id, $currentUserID)
    {
        $checkLike = $this->isNotInLikes($id, $currentUserID);
        $checkDislike = $this->isNotInDislikes($id, $currentUserID);
        $checkMatch = $this->isNotInMatches($id, $currentUserID);

        return $checkLike && $checkDislike && $checkMatch;
    }

    private function isNotInLikes($id, $currentUserID)
    {
        $likes = Like::where("owner_id", "=", $id)->get(); 

        foreach($likes as $like)
        {
            if($like->receiver_id == $currentUserID)
                return false;
        }
        return true;
    }

    private function isNotInDislikes($id, $currentUserID)
    {
        $dislikes = Dislike::where("owner_id", "=", $id)->get(); 

        foreach($dislikes as $dislike)
        {
            if($dislike->receiver_id == $currentUserID)
                return false;
        }
        return true;
    }

    private function isNotInMatches($id, $currentUserID)
    {
        $matches = Match::all();

        foreach($matches as $match)
        {
            if( ($match->user1_id == $id && $match->user2_id == $currentUserID) 
                ||
                ($match->user1_id == $currentUserID && $match->user2_id == $id) 
              ) 
                return false;
        }
        return true;
    }
}
