<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ReviewLesson;
use Illuminate\Support\Facades\DB;

class RiewviewLessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ReviewLesson::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::unprepared('SET IDENTITY_INSERT ReviewsLesson ON;');
        return DB::table('ReviewsLesson')->insert($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($LessonID)
    {
        return DB::table('ReviewsLesson')->where('LessonID', $LessonID)->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $LessonID)
    {
        return DB::table('ReviewsLesson')->where('LessonID', $LessonID)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($LessonID)
    {
        return DB::table('ReviewsLesson')->where('LessonID', $LessonID)->delete();
    }
}
