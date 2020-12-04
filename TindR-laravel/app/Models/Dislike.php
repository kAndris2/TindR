<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dislike extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        "id",
        "owner_id",
        "receiver_id",
        "date"
    ];
}
