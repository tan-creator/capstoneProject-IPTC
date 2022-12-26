<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\PostResource;
use App\Http\Requests\PostRequest;
use App\Models\Comment;
use App\Models\Like;
use Exception;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = PostResource::collection(Post::all());
        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\PostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        DB::unprepared('SET IDENTITY_INSERT Post ON;');
        if (Post::create($request->all())) {
            return response()->json(['status' => 200, 'msg' => 'Inserted successfully'], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\PostRequest  $request
     * @param  int  $PostID
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $PostID)
    {
        try {
            if (!Post::Where('PostID', $PostID)) {
                return response()->json(['status' => 400, 'msg' => 'Can not find this post'], 400);
            }
            Post::Where('PostID', $PostID)->update(array($request));
            return response()->json(['status' => '200', 'msg' => 'Updated successfully'], 200);
        }
        catch (Exception $e) {
            return response()->json(['status' => 400, 'msg' => 'Could not update this post'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($PostID)
    {
        if (Post::where('PostID', $PostID)->delete()) {
            return response()->json(['status' => 200, 'msg' => 'Deleted successfully'], 200);
        }
    }
}
