<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ReviewLesson;
use App\Http\Requests\ReviewRequest;

class RiewviewLessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json(ReviewLesson::all(), 200);
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
     * @param  \Illuminate\Http\ReviewRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReviewRequest $request)
    {
        try {
            ReviewLesson::create($request->all());
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
    public function show($SubjectID)
    {
        try {
            if (empty(ReviewLesson::where('SubjectID', $SubjectID)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find any review'
                ], 400);
            }
            return response()->json(ReviewLesson::where('SubjectID', $SubjectID)->get(), 200);
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
     * @param  \Illuminate\Http\ReviewRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ReviewRequest $request, $LessonID)
    {
        try {
            if (empty(ReviewLesson::where('LessonID', $LessonID)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find this student'
                ], 400);
            }
            ReviewLesson::where('LessonID', $LessonID)
                   ->update($request->except(
                        'LessonID', 
                        'SubjectID', 
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
    public function destroy($LessonID)
    {
        try {
            ReviewLesson::where('LessonID', $LessonID)->delete();
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
