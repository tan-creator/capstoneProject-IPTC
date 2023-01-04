<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StudentRequest extends FormRequest
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
            'ParentUserName' => 'required|max:40',
            'ClassID' => 'required|integer',
            'StudentName' => 'required|max:40',
            'StudentImage' => 'nullable|max:400',
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
            'ParentUserName.required' => ':attribute is required',
            'ClassID.required' => ':attribute is required',
            'StudentName.required' => ':attribute is required',

            'ParentUserName.max' => ':attribute is maximum 40 characters long',
            'StudentName.max' => ':attribute is maximum 40 characters long',
            'StudentImage.max' => ':attribute is maximum 100 characters long',

            'ClassID.integer' => ':attribute must be an integer',
        ];
    }

    /**
     * Get the validation attributes name.
     *
     * @return array<string, mixed>
     */
    public function attributes()
    {
        return [
            'ParentUserName' => 'Teacher account name',
            'ClassID' => 'Id class',
            'StudentName' => 'Student name',
            'StudentImage' => 'Picture of the student',
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
