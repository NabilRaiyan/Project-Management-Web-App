<?php

namespace App\Http\Controllers;

// importing libraries
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;


// creating task controller
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', "desc");
        $query = Task::query();

        
        if (request("name")){
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")){
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sort_field, $sort_direction)->paginate(10);
        return inertia("Tasks/TaskIndex", [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success'),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::all();


        return inertia("Tasks/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {


        $data = $request->validated();
        /** @var $image \illuminate\Http\UploadedFile */

        Log::info($data);

        $data['assigned_user_id'] = (int) $data['assigned_user_id'];

        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image){
            $data['image_path'] = $image->store('task/'.Str::random(), "public");
        }
        Task::create($data);

        return to_route('task.index')->with('success', "Task is created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Tasks/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::all();


        return inertia("Tasks/Edit", [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image){
            if($task->image_path){
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/'.Str::random(), "public");
        }
        $task->update($data);
        return to_route('task.index')->with('success', "Task \"$task->name\" is updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if($task->image_path){
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task -> delete();
        return to_route('task.index')->with('success', "Task \"$name\" deleted successfully");
    }
}
