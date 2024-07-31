<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){

        $user = auth()->user();
        $totalPendingTask = Task::query()->where('status', 'pending')->count();
        $myPendingTask = Task::query()->where('assigned_user_id', $user->id)->count();

        return inertia("Dashboard", [
            'totalPendingTask' => $totalPendingTask,
            'myPendingTask' => $myPendingTask,
        ]);
    }
}
