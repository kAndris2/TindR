<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        "id",
        "user_id",
        "date",
        "content"
    ];
}
