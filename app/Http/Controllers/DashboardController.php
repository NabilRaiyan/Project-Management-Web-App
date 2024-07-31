<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        
        $totalPendingTask = Task::query()->where('status', 'pending')->count();
        $myPendingTask = Task::query()->where('assigned_user_id', $user->id)
                             ->where('status', 'pending')
                             ->count();
        

        return Inertia::render('Dashboard', [
            'totalPendingTask' => $totalPendingTask,
            'myPendingTask' => $myPendingTask,
            'auth' => ['user' => $user],
        ]);
    }
}
