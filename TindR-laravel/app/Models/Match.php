<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        "id",
        "user1_id",
        "user2_id",
        "date"
    ];
}
