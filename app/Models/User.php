<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    public $timestamps = false;

    protected $fillable = [
        'account_id',
        'name',
        'birthdate',
        'passion',
        'gender',
        'description',
        'job_title',
        'company',
        'school',
        'anthem',
        'sexual_orientation',
        'global',
        'status'
    ];
}
