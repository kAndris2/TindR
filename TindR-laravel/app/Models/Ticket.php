<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        "id",
        "notifier_id",
        "solved",
        "date",
        "subject",
        "section",
        "steps",
        "solver_id"
    ];
}
