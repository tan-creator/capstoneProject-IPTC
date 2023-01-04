<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Http\Requests\StudentRequest;

class StudentController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {  
        try {
            $users = Student::all();
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
     * @param  \Illuminate\Http\StudentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StudentRequest $request)
    {
        try {
            Student::create($request->all());
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($ClassID)
    {
        try {
            if (empty(Student::where('ClassID', $ClassID)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find any student'
                ], 400);
            }
            return response()->json(Student::where('ClassID', $ClassID)->get(), 200);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            if (empty(Student::where('StudentID', $id)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find this student'
                ], 400);
            }
            Student::where('StudentID', $id)
                   ->update($request->except(
                        'StudentID', 
                        'ParentUserName', 
                        'ClassID'
                    ));   
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Student::where('StudentID', $id)->delete();
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
