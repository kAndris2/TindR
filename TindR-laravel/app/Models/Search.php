<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Search extends Model {
    public $timestamps = false;

    protected $fillable = [
        'id',
        'max_distance',
        'looking_for',
        'min_age',
        'max_age',
        'global',
        'status'
    ];
}