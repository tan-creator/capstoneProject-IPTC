<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $users = User::all();
            return response()->json($users, 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => $e,
            ], 400);
        }
    }
  
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        try {
            User::create($request->all());
            return response()->json([
                'status' => 200, 
                'msg' => 'Created successfully!'
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => $e,
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $UserName
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $UserName)
    {     
        try {
            if (empty(User::Where('UserName', $UserName)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find this user'
                ], 400);
            }

            User::Where('UserName', $UserName)
                ->update($request->except('PassWord'));   
            return response()->json([
                'status' => 200, 
                'msg' => 'Updated successfully'
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => $e,
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $UserName
     * @return \Illuminate\Http\Response
     */
    public function destroy($UserName)
    {
        try {
            User::where('UserName', $UserName)->delete();
            return response()->json([
                'status' => 200, 
                'msg' => 'Removed user successfully'
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => $e,
            ], 400);
        }
    }
}
