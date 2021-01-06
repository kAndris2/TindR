<?php

namespace App\Exceptions;

class NoImageException extends \Exception
{
    protected $details;
    
    public function __construct($details) {
        $this->details = $details;
        parent::__construct();
    }
  
    public function __toString() {
      return $this->details;
    }

}
