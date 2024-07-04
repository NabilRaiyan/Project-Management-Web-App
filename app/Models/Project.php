<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // creating relationship with tasks
    public function tasks(){
        return $this->hasMany(Task::class);
    }
}
