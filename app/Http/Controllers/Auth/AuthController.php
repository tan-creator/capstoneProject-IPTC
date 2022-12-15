<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function login(Request $request) {
        $Password = DB::table('Users')->select('PassWord')->where('UserName', $request->UserName)->get();

        if ($Password->count() > 0) {
            if(Hash::check($request->PassWord, $Password[0]->PassWord)) {
                $userInfo = User::where('UserName', $request->UserName)->get();
                return $userInfo;
            } else {
                return response()->json(['statusCode' => 400, 'msg' => 'Sai mật khẩu, mời nhập lại!']);
            }
        } else {
            return response()->json(['statusCode' => 400, 'msg' => 'Tài khoản không tồn tại !']);
        }
    }

    public function resetPassword(Request $request) {
        return DB::table('Users')
                ->where('UserName', $request->UserName)
                ->update(['PassWord' => bcrypt($request->PassWord)]);
    }
}
