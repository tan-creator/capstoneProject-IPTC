<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permission;
use App\Http\Resources\PermissionResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PermissionResource::collection(Permission::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return DB::table('permissionForm')->insert($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $ParentUsername
     * @return \Illuminate\Http\Response
     */
    public function showForParent($ParentUsername)
    {
        $studentIDobjs = DB::select('EXEC SELECT_STUIDBYPARENT ?', array($ParentUsername));
        $studentIDarrs = [];
        foreach ( $studentIDobjs as $studentIDobj) {
            $studentIDarrs[] = $studentIDobj->StudentID;
        }
        $permissionByStudentID = Permission::where('StudentID', $studentIDarrs)->get();
        return PermissionResource::collection($permissionByStudentID);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $ParentUsername
     * @return \Illuminate\Http\Response
     */
    public function showForTeacher($TeacherUsername)
    {
        $studentIDobjs = DB::select('EXEC SELECT_STUIDBYTEACHER ?', array($TeacherUsername));
        $studentIDarrs = [];
        foreach ( $studentIDobjs as $studentIDobj) {
            $studentIDarrs[] = $studentIDobj->StudentID;
        }
        $permissionByStudentID = Permission::where('StudentID', $studentIDarrs)->get();
        return PermissionResource::collection($permissionByStudentID);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($PermissionFormID)
    {
        return DB::table('permissionForm')->where('PermissionFormID', $PermissionFormID)->delete();
    }
}
