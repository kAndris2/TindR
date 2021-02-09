<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;

class ChatModel //extends Model
{
    public $id;
    public $userName;
    public $lastMessage;
    public $img;

    function __construct($userid, $uName, $lMessage, $uImg) 
    {
        $this->id = $userid;
        $this->userName = $uName;
        $this->lastMessage = $lMessage;
        $this->img = $uImg;
    }
}
