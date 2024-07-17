<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Http\Resources\TaskResource;
// creating project controller class
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', "desc");
        $query = Project::query();
        if (request("name")){
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")){
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sort_field, $sort_direction)->paginate(10);
        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        dd($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        
        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', "desc");

        if (request("name")){
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")){
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sort_field, $sort_direction)->paginate(10)->onEachSide(1);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
