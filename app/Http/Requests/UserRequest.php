<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
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
            'UserName' => 'required|max:40',
            'PassWord' => 'required|max:40',
            'Role'=> [
                'required',
                Rule::in(['Teacher', 'Parent'])
            ],
            'Names' => 'required|max:40',
            'Images' => 'nullable|max:400',
            'Phone' => 'nullable|max:40',
            'Token' => 'nullable',
            'Positions' => 'required_if:Role,Teacher|max:40',
            // 'BirthDay' => 'nullable|date_format:Y-m-d H:i:s',
            'BirthDay' => 'nullable',
            'Degree' => 'nullable|max:40',
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
            'UserName.required' => ':attribute is required',
            'PassWord.required' => ':attribute is required',
            'Role.required' => ':attribute is required',
            'Names.required' => ':attribute is required',

            'Positions.required_if' => ':attribute is required because you are teacher',

            'UserName.max' => ':attribute is maximum 40 characters long',
            'PassWord.max' => ':attribute is maximum 40 characters long',
            'Names.max' => ':attribute is maximum 40 characters long',
            'Images.max' => ':attribute is maximum 400 characters long',
            'Phone.max' => ':attribute is maximum 40 characters long',
            'Positions.max' => ':attribute is maximum 40 characters long',
            'Degree.max' => ':attribute is maximum 40 characters long',

            'Role.in' => 'The :attribute must be one of the following types: :values',

            //'BirthDay.date_format' => ':attribute must have date format Y-m-d H:i:s',
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
            'UserName' => 'User account name',
            'Names' => 'Full name',
            'Images' => 'Avatar of user',
            'Phone' => 'Phone number',
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
