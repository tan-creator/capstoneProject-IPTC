<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class PermissionResource extends JsonResource
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
            'PermissionFormID' => $this->PermissionFormID,
            'StudentName' => DB::table('Student')
                            ->select('StudentName')
                            ->where('StudentID', '=', $this->StudentID)
                            ->first()->StudentName,
            'TeacherName' => DB::select('EXEC SELECT_TEACHERNAME ?', array($this->StudentID))[0]->Names,
            'PermissionDay' => date('d-m-Y', strtotime($this->Permission)),
            'PermissionContent' => $this->PermissionContent,
        ];
    }
}
