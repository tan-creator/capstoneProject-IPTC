<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Point;
use App\Http\Requests\PointRequest;

class PointController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json(Point::all(), 200);
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
     * @param  \Illuminate\Http\PointRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PointRequest $request)
    {
        try {
            Point::create($request->all());
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
    public function show($StudentID)
    {
        try {
            if (empty(Point::where('StudentID', $StudentID)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find any point of student ID ' . $StudentID,
                ], 400);
            }
            return response()->json(Point::where('StudentID', $StudentID)->get(), 200);
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
     * @param  \Illuminate\Http\PointRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PointRequest $request, $StudentID, $SubjectID)
    {
        try {
            if (empty(Point::where([['StudentID', $StudentID],['SubjectID', $SubjectID]])->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find any point of student ID ' . $StudentID,
                ], 400);
            }
            Point::where([
                        ['StudentID', $StudentID],
                        ['SubjectID', $SubjectID]
                    ])
                    ->update($request->except(
                        'SubjectID',
                        'StudentID',
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
    public function destroy($StudentID, $SubjectID)
    {
        try {
            Point::where([['StudentID', $StudentID],['SubjectID', $SubjectID]])->delete();
            return response()->json([
                'status' => 200, 
                'msg' => 'Removed successfully'
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