<?php
namespace App\Http\Controllers;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Str;

// creating user controller
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', "desc");
        $query = User::query();
        if (request("name")){
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("email")){
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $users = $query->orderBy($sort_field, $sort_direction)->paginate(10);
        return inertia("User/Index", [
            "users" => UserResource::collection($users),
            "queryParams" => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
    
        User::create($data);

        return to_route('user.index')->with('success', "User is created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("User/Edit", [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password){
            $data['password'] = bcrypt($password);
        }else{
            unset($data['password']);
        }
        $data['updated_by'] = Auth::id();
       
        $user->update($data);
        return to_route('user.index')->with('success', "User \"$user->name\" is updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        
        $name = $user->name;
        
        $user -> delete();
        return to_route('user.index')->with('success', "User \"$name\" deleted successfully");
    }
}
