<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model {
    protected $fillable = [
        'account_id',
        'upload_date',
        'route'
    ];
}