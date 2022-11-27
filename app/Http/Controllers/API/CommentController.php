<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $CommentContents = DB::table('Comment')->pluck('CommentContent', 'CommentID');

        // foreach ($CommentContents as $CommentID => $CommentContent) {
        //     echo $CommentID . ': ' . $CommentContent . "\n";
        // }

        // DB::table('Comment')->orderBy('CommentID')->lazy()->each(function ($comment) {
        //     echo $comment->CommentID . "\n";
        // });

        // $comment = DB::table('Comment')
        //     ->select(DB::raw('count(*) as commentCount, PostID'))
        //     ->where('PostID', '<>', 5)
        //     ->groupBy('PostID')
        //     ->get();

        // return $comment;

        return Comment::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::unprepared('SET IDENTITY_INSERT Comment ON;');
        return DB::table('Comment')->insert($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        return DB::table('Comment')->where('CommentID', $id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return DB::table('Comment')->where('CommentID', $id)->delete();
    }
}
