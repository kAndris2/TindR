<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        "id",
        "owner_id",
        "receiver_id"
    ];
}
