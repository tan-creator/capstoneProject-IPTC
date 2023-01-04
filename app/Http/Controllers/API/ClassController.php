<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Http\Controllers\Controller;
use App\Models\MClass;
use Illuminate\Support\Facades\DB;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json(MClass::all(), 200);
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     DB::unprepared('SET IDENTITY_INSERT TheClass ON;');
    //     return DB::table('TheClass')->insert($request->all());
    // }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($ClassID)
    {
        return DB::table('TheClass')->where('ClassID', $ClassID)->get();
        try {
            if (empty(MClass::where('ClassID', $ClassID)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find this class',
                ], 400);
            }
            return response()->json(MClass::where('ClassID', $ClassID)->get(), 200);
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
    // public function update(Request $request, $ClassID)
    // {
    //     return DB::table('TheClass')->where('ClassID', $ClassID)->update($request->all());
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function destroy($ClassID)
    // {
    //     return DB::table('TheClass')->where('ClassID', $ClassID)->delete();
    // }
}
