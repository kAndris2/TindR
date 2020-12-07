<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model {
    public $timestamps = false;

    protected $fillable = [
        'id',
        'upload_date',
        'route'
    ];
}