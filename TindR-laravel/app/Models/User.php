<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $primaryKey = 'account_id';
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
