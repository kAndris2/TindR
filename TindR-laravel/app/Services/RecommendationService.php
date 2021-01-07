<?php

namespace App\Services;

use App\Models\Picture;
use App\Models\User;
use App\Models\Search;
use App\Models\Like;
use App\Models\Dislike;
use App\Models\Match;


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
            if($this->isUserStatusPublic($u->id))
            {
                if ($this->isNotVoted($id, $u->id))
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
