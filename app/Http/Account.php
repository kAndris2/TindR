<?php

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    protected $fillable = [
        'id',
        'email',
        'password',
        'phone_number'
    ];
}