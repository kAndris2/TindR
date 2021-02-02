<?php

namespace App\Services;

use App\Models\Log;

class LogService
{
   public function createLog($data)
   {
        Log::create([
            "user_id" => $data["user_id"],
            "date" => round(microtime(true) * 1000),
            "content" => $data["content"]
        ]);
   } 
}
