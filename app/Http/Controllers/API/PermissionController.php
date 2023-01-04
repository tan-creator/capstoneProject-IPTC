<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permission;
use App\Http\Resources\PermissionResource;
use Illuminate\Support\Facades\DB;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json(PermissionResource::collection(Permission::all()), 200);
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
    public function store(Request $request)
    {
        try {
            Permission::create($request->all());
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
     * @param  string  $ParentUsername
     * @return \Illuminate\Http\Response
     */
    public function showForParent($ParentUsername)
    {
        try {
            $studentIDobjs = DB::select('EXEC SELECT_STUIDBYPARENT ?', array($ParentUsername));
            $studentIDarrs = [];

            foreach ( $studentIDobjs as $studentIDobj) {
                $studentIDarrs[] = $studentIDobj->StudentID;
            }
            
            $permissionByStudentID = Permission::where('StudentID', $studentIDarrs)->get();
            return response()->json(PermissionResource::collection($permissionByStudentID), 200);
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
     * @param  string  $ParentUsername
     * @return \Illuminate\Http\Response
     */
    public function showForTeacher($TeacherUsername)
    {
        try {
            $studentIDobjs = DB::select('EXEC SELECT_STUIDBYTEACHER ?', array($TeacherUsername));
            $studentIDarrs = [];

            foreach ( $studentIDobjs as $studentIDobj) {
                $studentIDarrs[] = $studentIDobj->StudentID;
            }

            $permissionByStudentID = Permission::where('StudentID', $studentIDarrs)->get();
            return response()->json(PermissionResource::collection($permissionByStudentID), 200);
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
    public function destroy($PermissionFormID)
    {
        try {
            Permission::where('PermissionFormID', $PermissionFormID)->delete();
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
