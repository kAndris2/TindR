<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'id',
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
