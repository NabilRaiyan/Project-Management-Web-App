<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rule;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project_id' => 'required|exists:projects,id',
            "image" => ['nullable', 'image'],
            "name"=> ['required', 'max:50'],
            "description"=> ['nullable', 'string'],
            "status"=> ['required', Rule::in(['pending', 'in_progress', 'completed'])],
            "due_date"=> ['required', 'date'],
            "priority"=> ['required', Rule::in(['low', 'medium', 'high'])],
            'assigned_user_id' => 'required|exists:users,id',



        ];
    }
}
