<?php

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    protected $fillable = [
        'account_id',
        'name',
        'age',
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