<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    public $timestamps = false;
    
    protected $fillable = [
        'email',
        'password',
        'phone_number',
        'latitude',
        'longitude'
    ];

}