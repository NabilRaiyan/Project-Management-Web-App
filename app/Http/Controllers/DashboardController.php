<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function Index(){

        $pendinTask = Task::query()->where('status', 'pending')->count();
        return inertia("Dashboard");
    }
}
