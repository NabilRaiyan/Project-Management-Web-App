<?php

namespace App\Http\Controllers;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index(){

        $user = auth()->user();
        $totalPendingTask = Task::query()->where('status', 'pending')->count();
        $myPendingTask = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();

        return inertia('Dashboard', compact('totalPendingTask', 'myPendingTask'));
    }
}
