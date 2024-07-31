<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $totla = 400;
        $totalPendingTask = Task::query()->where('status', 'pending')->count();
        $myPendingTask = Task::query()->where('assigned_user_id', $user->id)
                             ->where('status', 'pending')
                             ->count();


        return Inertia::render('Dashboard', [
            'totalPendingTask' => $totalPendingTask,
            'myPendingTask' => $myPendingTask,
            'total' => $totla,
            'auth' => ['user' => $user],
        ]);
    }
}
