<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use \Firebase\JWT\JWT;
use Exception;

class AuthController extends Controller
{
    /**
     * Check if username and password are correct, user will log in
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) {
        $Password = User::select('PassWord')
                        ->where('UserName', $request->UserName)
                        ->get()[0];

        if ($Password->count() > 0) {
            if(Hash::check($request->PassWord, $Password->PassWord)) {
                $userInfo = User::where('UserName', $request->UserName)->get();
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
                return response()->json([
                    'statusCode' => 400, 
                    'msg' => 'Sai mật khẩu, mời nhập lại!'], 
                400);
            }
        } else {
            return response()->json([
                'statusCode' => 400, 
                'msg' => 'Tài khoản không tồn tại !'], 
            400);
        }
    }

    public function resetPassword(Request $request) {
        try {
            $CurPassword = User::select('PassWord')
                                ->Where('UserName', $request->UserName)
                                ->first()->PassWord;

            if (!Hash::check($request->oldPassword, $CurPassword)) {
                return response()->json([
                    'statusCode' => 401, 
                    'msg' => 'Sai mật khẩu! Mời nhập lại!'], 
                401); 
            }
            if ($request->newPassword !== $request->verifyPassword) { 
                return response()->json([
                    'statusCode' => 400, 
                    'msg' => 'Mật khẩu mới và mật khẩu xác thực phải giống nhau!'], 
                400);
            }

            User::where('UserName', $request->UserName)
                ->update(['PassWord' => bcrypt($request->newPassword)]);

            return response()->json([
                'statusCode' => 200, 
                'msg' => 'Thay đổi thành công'], 
            200);
        }
        catch (Exception $e) {
            return response()->json([
                'statusCode' => 400, 
                'msg' => 'Kiểm tra lại input của bạn'], 
            400);
        }
    }
}
