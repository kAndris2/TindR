<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        "id",
        "user_id",
        "seen",
        "date",
        "content"
    ];
}
