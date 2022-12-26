<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cost;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CostRequest;

class CostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Cost::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CostRequest $request)
    {   
        DB::unprepared('SET IDENTITY_INSERT Cost ON;');
        if (Cost::create($request->all())) {
            return response()->json(['status' => 200, 'msg' => 'Inserted successfully'], 200);
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
        if(Cost::where('CostID', $CostID)->delete()) {
            return response()->json(['status' => 200, 'msg' => 'Deleted successfully'], 200);
        }
    }
}
