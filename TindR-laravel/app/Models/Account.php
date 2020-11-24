<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    public $timestamps = false;
    protected $fillable = [
        'id',
        'email',
        'password',
        'phone_number'
    ];
}