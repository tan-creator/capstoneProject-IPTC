<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Post;
use Illuminate\Http\Request;

class fillDataPostMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $PostID)
    {
        return $PostID;
        // $data = Post::Where('PostID', $PostID)->first();
        // if (empty($data)) {
        //     return response()->json([
        //         'status' => 400, 
        //         'msg' => 'Can not find this post'
        //     ], 400);
        // }
        // $request->PostID = $PostID;
        // $request->UserName = $data->UserName;
        //return $next($request, $PostID);
    }
}
