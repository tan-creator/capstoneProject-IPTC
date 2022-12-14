<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PostRequest extends FormRequest
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
            'UserName' => 'required',
            'Content' => 'max:4000',
            'PostImage' => 'max:400',
            // 'PostDay' => 'date:Y-m-d H:i:s',
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

            'Content.max' => ':attribute is maximum 4000 characters long',
            'PostImage.max' => ':attribute is maximum 40 characters long',

            //'PostDay.date_format' => ':attribute must have date format Y-m-d H:i:s',
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
            'PostID' => 'ID post',
            'UserName' => 'User account name',
            'Content' => 'Description of the post',
            'PostImage' => 'Post image',
            'PostDay' => 'Created day',
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
