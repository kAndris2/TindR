<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        "id",
        "from_id",
        "to_id",
        "date",
        "seen",
        "content"
    ];
}
