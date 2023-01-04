<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\Post;
use App\Models\Like;
use App\Models\Comment;
// use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Http\Controllers\Controller;
// use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $posts = PostResource::collection(Post::all());
            return response()->json($posts, 200);
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
     * @param  \Illuminate\Http\PostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        try {
            Post::create($request->all());
            return response()->json([
                'status' => 200, 
                'msg' => 'Posted successfully'
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $PostID
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $PostID)
    {
        try {
            //$post = json_decode(json_encode(Post::Where('PostID', $PostID)->first()),true);
            // Arr::pull($post, 'PostID');
            // Arr::pull($post, 'UserName');
            if (empty(Post::Where('PostID', $PostID)->first())) {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Can not find this post'
                ], 400);
            }

            // $post = array_replace_recursive($post, $request->all());
            // $post = new PostRequest($post);
            // $post = $this->validatePost($post);

            // Validator::make($request->all(),[
            //     'Content' => 'max:4000',
            //     'PostImage' => 'max:400',
            // ], [
            //     'Content.max' => ':attribute is maximum 4000 characters long',
            //     'PostImage.max' => ':attribute is maximum 40 characters long',
            // ])->validate();

            Post::Where('PostID', $PostID)->update($request->except('PostID', 'UserName'));   
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
    public function destroy($PostID)
    {
        try {
            Post::where('PostID', $PostID)->delete();
            return response()->json([
                'status' => 200, 
                'msg' => 'Removed post successfully'
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function like(Request $request)
    {
        try {
            Like::create($request->all());
            return response()->json([
                'status' => 200, 
                'msg' => 'Liked successfully'
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Like failed! Something were wrong!'
            ], 400);
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
                return response()->json([
                    'status' => 200, 
                    'msg' => 'Disliked successfully'
                ], 200);
            } else {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'You did not like this post yet!'
                ], 400);
            }
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Dislike failed! Something were wrong!'
            ], 400);
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
            return response()->json([
                'status' => 200, 
                'msg' => 'Commented successfully'
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Comment failed! Something were wrong!'
            ], 400);
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
                return response()->json([
                    'status' => 200, 
                    'msg' => 'Removed comment successfully'
                ], 200);
            } else {
                return response()->json([
                    'status' => 400, 
                    'msg' => 'Not found this comment'
                ], 400);
            }
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 400, 
                'msg' => 'Remove failed! Something were wrong!'
            ], 400);
        }
    }
}
