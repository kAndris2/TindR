<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    public $id;
    public $name;
    public $age;
    public $distance;
    public $description;
    //public $Img_routes = array();

    public function __construct($Id, $Name, $Age, $Distance, $Description)//, $Img_routes)
    {
        $id = $Id;
        $name = $Name;
        $age = $Age;
        $distance = $Distance;
        $description = $Description;
        //$this->Img_routes = $Img_routes;
    }
}
