<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        if ($this->Role === 'Parent') {
            return array(
                'UserName' => $this->UserName,
                'Role' => $this->Role,
                'Names' => $this->Names,
                'Images' => $this->Images,
                'Phone'=> $this->Phone,
                'Token' => $this->Token,
                'Positions' => $this->Positions,
                'BirthDay' => date('d-m-Y', strtotime($this->BirthDay)),
                'Degree' => $this->Degree,
                'MoreInfo' => DB::select('EXEC SELECT_CLASS_STUDENT_BYPARENT ? ', array($this->UserName)),
            );
            
        } else if ($this->Role === 'Teacher') {
            return array(
                'UserName' => $this->UserName,
                'Role' => $this->Role,
                'Names' => $this->Names,
                'Images' => $this->Images,
                'Phone'=> $this->Phone,
                'Token' => $this->Token,
                'Positions' => $this->Positions,
                'BirthDay' => date('d-m-Y', strtotime($this->BirthDay)),
                'Degree' => $this->Degree,
                // 'MoreInfo' => DB::select('EXEC SELECT_CLASS_BYTEACHER ? ', array($this->UserName)),
                'MoreInfo' => DB::table('TheClass')->Where('TeacherClassUserName', '=', $this->UserName)->get(),
            );
        }
    }
}
