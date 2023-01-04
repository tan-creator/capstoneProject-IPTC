<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\Cost;
use App\Http\Requests\CostRequest;
use App\Http\Controllers\Controller;

class CostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $costs = Cost::all();
            if (!$costs) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Nothing here!'
                ], 200);
            }
            return response()->json($costs, 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Can not get data! Make sure you have permission to get this data!'
            ], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CostRequest $request)
    {   
        try {
            Cost::create($request->all());
            return response()->json([
                'status' => 200, 
                'msg' => 'Saved successfully'
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Save failed! Something were wrong with data!'
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
            $costsByClassId = Cost::where('ClassID', $ClassID)->get();
            if (!$costsByClassId) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Nothing here!'
                ], 200);
            }
            return response()->json($costsByClassId, 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Can not get data! Make sure your classID is true!'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($CostID)
    {
        try {
            Cost::where('CostID', $CostID)->delete();
            return response()->json([
                'status' => 200, 
                'msg' => 'Deleted successfully'
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Post failed! Make sure your CostID is true!'
            ], 400);
        }
    }
}
