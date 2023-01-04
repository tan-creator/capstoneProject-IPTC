<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Http\Requests\SubjectRequest;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $subjects = Subject::all();
            return response()->json($subjects, 200);
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
     * @param  \Illuminate\Http\SubjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SubjectRequest $request)
    {
        try {
            Subject::create($request->all());
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            if (empty(Subject::where('SubjectID', $id)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find this subject'
                ], 400);
            }
            Subject::where('SubjectID', $id)
                   ->update($request->except(
                        'SubjectID', 
                        'TeacherSubjectUserName', 
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
            Subject::where('SubjectID', $id)->delete();
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
