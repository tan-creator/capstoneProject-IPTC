<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CostRequest extends FormRequest
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
     * |decimal:0,10
     */
    public function rules()
    {
        return [
            'CostID' => 'nullable',
            'ClassID' => 'required',
            'CostType' => 'required|max:40',
            'CostAmountMoney' => 'required',
            'CostDescription' => 'required|max:400',
            'CreateAt' => 'required|date_format:Y-m-d H:i:s',
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
            'ClassID.required' => ':attribute is required',
            'CostType.required' => ':attribute is required',
            'CostAmountMoney.required' => ':attribute is required',
            'CostDescription.required' => ':attribute is required',
            'CreateAt.required' => ':attribute is required',
            'CostType.max' => ':attribute is maximum 40 characters long',
            'CostDescription.max' => ':attribute is maximum 400 characters long',
            //'CostAmountMoney.decimal' => ':attribute must have between 0 and 10 decimal places',
            'CreateAt.date_format' => ':attribute must have date format Y-m-d H:i:s',
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
            'CostID' => 'ID of bill',
            'ClassID' => 'ID of class',
            'CostType' => 'Name of bill',
            'CostAmountMoney' => 'Cost',
            'CostDescription' => 'Description',
            'CreateAt' => 'Create date',
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
