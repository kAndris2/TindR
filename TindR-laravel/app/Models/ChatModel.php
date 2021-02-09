<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;

class ChatModel //extends Model
{
    public $id;
    public $userData;
    public $lastMessage;
    public $img;

    function __construct($id, $uData, $lMessage, $uImg) 
    {
        $this->id = $id;
        $this->userData = $uData;
        $this->lastMessage = $lMessage;
        $this->img = $uImg;
    }
}
