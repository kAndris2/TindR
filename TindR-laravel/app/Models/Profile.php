<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    public $Id;
    public $Name;
    public $Age;
    public $Distance;
    public $Description;
    public $Img_routes = array();

    function __construct($Id, $Name, $Age, $Distance, $Description, $Img_routes)
    {
        $this->Id = $Id;
        $this->Name = $Name;
        $this->Age = $Age;
        $this->Distance = $Distance;
        $this->Description = $Description;
        $this->Img_routes = $Img_routes;
    }
}
