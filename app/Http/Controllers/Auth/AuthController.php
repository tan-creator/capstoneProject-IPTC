<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class AuthController extends Controller
{
    public function login(Request $request) {
        DB::unprepared('SET IDENTITY_INSERT Subject ON;');
        $Password = DB::table('Users')->select('PassWord')->where('UserName', $request->UserName)->get();
        if ($Password) {
            if($request->PassWord == $Password[0]->PassWord) {
                return DB::table('Users')->where('UserName', $request->UserName)->get();
            } else {
                return response()->json('Sai mật khẩu, mời nhập lại!');
            }
        } else {
            return response()->json('Tài khoản không tồn tại!');
        }
    }
}
