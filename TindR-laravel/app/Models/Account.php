<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    public $timestamps = false;
<<<<<<< HEAD
=======

>>>>>>> e32a0e315e64e0ea1c633c131dae221fa4ad2b6f
    protected $fillable = [
        'email',
        'password',
        'phone_number'
    ];
}