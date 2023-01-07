<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Post;
use App\Models\Like;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'PostID' => $this->PostID,
            'UserName' => $this->AdminUserName,
            'Content' => $this->Content,
            'PostImage' => $this->PostImage,
            'Likes' => DB::table('Likes')
                        ->where('PostID', '=', $this->PostID)
                        ->get(),
            'Comments' => DB::table('Comment')
                        ->where('PostID', '=', $this->PostID)
                        ->get(),
        ];
    }
}
