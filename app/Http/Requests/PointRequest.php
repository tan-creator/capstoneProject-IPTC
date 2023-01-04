<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PointRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'SubjectID' => 'required|integer',
            'StudentID' => 'required|integer',
            'Oral_1' => 'nullable|integer',
            'Oral_2' => 'nullable|integer',
            'Oral_3' => 'nullable|integer',
            'Quiz1' => 'nullable|integer',
            'Quiz2' => 'nullable|integer',
            'Quiz3' => 'nullable|integer',
            'Midterm' => 'nullable|integer',
            'Final' => 'nullable|integer',
        ];
    }

    /**
     * Get the validation message When wrong rule to the request.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'SubjectID.required' => ':attribute is required',
            'StudentID.required' => ':attribute is required',

            'SubjectID.integer' => ':attribute must be an integer',
            'StudentID.integer' => ':attribute must be an integer',
            'Oral_1.integer' => ':attribute must be an integer',
            'Oral_2.integer' => ':attribute must be an integer',
            'Oral_3.integer' => ':attribute must be an integer',
            'Quiz1.integer' => ':attribute must be an integer',
            'Quiz2.integer' => ':attribute must be an integer',
            'Quiz3.integer' => ':attribute must be an integer',
            'Midterm.integer' => ':attribute must be an integer',
            'Final.integer' => ':attribute must be an integer',
        ];
    }

    public function attributes()
    {
        return [
            'SubjectID' => 'Id Subject',
            'StudentID' => 'Id Subject',
            'Oral_1' => 'First oral point',
            'Oral_2' => 'Second oral point',
            'Oral_3' => 'Third oral point',
            'Quiz1' => 'First Quiz point',
            'Quiz2' => 'Second Quiz point',
            'Quiz3' => 'Third Quiz point',
            'Midterm' => 'Midterm point',
            'Final' => 'Final point',
        ];
    }

    /**
     * Through error messages when have any problem
     *
     * @return HttpResponseException
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors(),
        ]));
    }
}
