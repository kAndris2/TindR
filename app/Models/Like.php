<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = [
        "id",
        "owner_id",
        "receiver_id"
    ];
}
