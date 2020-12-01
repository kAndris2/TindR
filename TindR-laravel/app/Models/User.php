<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $appends = ['status'];
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
    public function getStatusAttribute(){
        return true;
    }
}
