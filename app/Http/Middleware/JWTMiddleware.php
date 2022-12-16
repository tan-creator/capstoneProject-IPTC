<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {   
        $token = isset($request->Token) ? $request->Token : false;
        if (!$token) {
            return response()->json(['status' => 401, 'message' => 'Invalid Token'], 401);
        }

        try {
            $secretKey = env('TOKEN_KEY');
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            //return response()->json(['status' => 200, 'message' => $decoded], 200);
            return $next($request);
        }
        catch (ExpiredException $e) {
            return response()->json(['status' => 401, 'message' => 'Token has expired'], 401);
        }
        catch(Exception $e) {
            return response()->json(['status' => 401, 'message' => 'Unauthorized access'], 401);
        }
    }
}
