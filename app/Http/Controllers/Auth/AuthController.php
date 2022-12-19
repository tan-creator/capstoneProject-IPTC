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
use \Firebase\JWT\JWT;

class AuthController extends Controller
{
    public function login(Request $request) {
        $Password = DB::table('Users')->select('PassWord')->where('UserName', $request->UserName)->get();

        if ($Password->count() > 0) {
            if(Hash::check($request->PassWord, $Password[0]->PassWord)) {
                $userInfo = User::where('UserName', $request->UserName)->get();
                //$result = UserResource::collection($userInfo);
                $token = JWT::encode([
                    'Username' => $userInfo[0]->UserName,
                    'Name' => $userInfo[0]->Names,
                    'initial' => time(),
                    'expires' => time() + 60 * 60,
                ], env('TOKEN_KEY'), 'HS256');

                $userInfo[0]->Token = $token;
                // return $userInfo;
                return response()->json(UserResource::collection($userInfo), 200);
            } else {
                return response()->json(['statusCode' => 400, 'msg' => 'Sai mật khẩu, mời nhập lại!'], 400);
            }
        } else {
            return response()->json(['statusCode' => 400, 'msg' => 'Tài khoản không tồn tại !'], 400);
        }
    }

    public function resetPassword(Request $request) {
        return DB::table('Users')
                ->where('UserName', $request->UserName)
                ->update(['PassWord' => bcrypt($request->PassWord)]);
    }
}
