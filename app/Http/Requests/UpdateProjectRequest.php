<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rule;

use Illuminate\Foundation\Http\FormRequest;

// update project request class
class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "image" => ['nullable', 'image'],
            "name"=> ['required', 'max:50'],
            "description"=> ['nullable', 'string'],
            "due_date"=> ['required', 'date'],
            "status"=> ['required', Rule::in(['pending', 'in_progress', 'completed'])],

        ];
    }
}
