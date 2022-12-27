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
        try {
            Post::create($request->all());
            return response()->json(['status' => 200, 'msg' => 'Posted successfully'], 200);
        }
        catch (Exception $e) {
            return response()->json(['status' => 400, 'msg' => 'Post failed! Something were wrong!'], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\PostRequest  $request
     * @param  int  $PostID
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, $PostID)
    {
        try {
            if (!Post::Where('PostID', $PostID)) {
                return response()->json(['status' => 400, 'msg' => 'Can not find this post'], 400);
            }
            Post::Where('PostID', $PostID)->update(array($request));
            return response()->json(['status' => 200, 'msg' => 'Updated successfully'], 200);
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
        try {
            Post::where('PostID', $PostID)->delete();
            return response()->json(['status' => 200, 'msg' => 'Removed post successfully'], 200);
        }
        catch (Exception $e) {
            return response()->json(['status' => 400, 'msg' => 'Remove failed! Something were wrong!'], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function like(Request $request)
    {
        try {
            Like::create($request->all());
            return response()->json(['status' => 200, 'msg' => 'Liked successfully'], 200);
        }
        catch (Exception $e) {
            return response()->json(['status' => 400, 'msg' => 'Like failed! Something were wrong!'], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function dislike(Request $request)
    {
        try {
            $Liked = Like::where('PostID', $request->PostID)
                     ->where('PersonUserName', $request->PersonUserName)
                     ->get('LikeID')[0]->LikeID; // Take Like ID by Post ID and Username
            if ($Liked) {
                Like::where('LikeID', $Liked)->delete();
                return response()->json(['status' => 200, 'msg' => 'Disliked successfully'], 200);
            } else {
                return response()->json(['status' => 400, 'msg' => 'You did not like this post yet!'], 400);
            }
        }
        catch (Exception $e) {
            return response()->json(['status' => 400, 'msg' => 'Dislike failed! Something were wrong!'], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function comment(Request $request)
    {
        try {
            Comment::create($request->all());
            return response()->json(['status' => 200, 'msg' => 'Commented successfully'], 200);
        }
        catch (Exception $e) {
            return response()->json(['status' => 400, 'msg' => 'Comment failed! Something were wrong!'], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function removeComment(Request $request)
    {
        try {
            $Commented = Comment::where('PostID', $request->PostID)
                     ->where('PersonUserName', $request->PersonUserName)
                     ->get('CommentID')[0]->CommentID; // Take Like ID by Post ID and Username
            if ($Commented) {
                Comment::where('CommentID', $Commented)->delete();
                return response()->json(['status' => 200, 'msg' => 'Removed comment successfully'], 200);
            } else {
                return response()->json(['status' => 400, 'msg' => 'This comment was not available'], 400);
            }
        }
        catch (Exception $e) {
            return response()->json(['status' => 400, 'msg' => 'Remove failed! Something were wrong!'], 400);
        }
    }
}
