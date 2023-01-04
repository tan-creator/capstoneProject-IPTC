<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SubjectRequest extends FormRequest
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
            'TeacherSubjectUserName' => 'required|max:40',
            'ClassID' => 'required|integer',
            'SubjectName' => 'required|max:40',
            'SubjectTime' => 'required|max:100',
            'DateOfWeek' => 'required|max:40',
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
            'TeacherSubjectUserName.required' => ':attribute is required',
            'ClassID.required' => ':attribute is required',
            'SubjectName.required' => ':attribute is required',
            'SubjectTime.required' => ':attribute is required',
            'DateOfWeek.required' => ':attribute is required',

            'TeacherSubjectUserName.max' => ':attribute is maximum 40 characters long',
            'SubjectName.max' => ':attribute is maximum 40 characters long',
            'SubjectTime.max' => ':attribute is maximum 100 characters long',
            'DateOfWeek.max' => ':attribute is maximum 40 characters long',

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
            'TeacherSubjectUserName' => 'Teacher account name',
            'ClassID' => 'Id class',
            'SubjectName' => 'Subject name',
            'SubjectTime' => 'Subject Time',
            'DateOfWeek' => 'Date of week',
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
