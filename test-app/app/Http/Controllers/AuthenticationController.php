<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'bio' => 'nullable|string',
            'img' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'bio' => $fields['bio'] ?? null,
            'img' => $fields['img'] ?? null,
        ]);

        return response()->json([
            'data' => [
                'user' => $user
            ]
        ], 201);
    }

    public function authentication(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // 認証を試みる
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'ログインに失敗しました'
            ], 401);
        }

        // セッション固定攻撃対策（必須）
        $request->session()->regenerate();

        // ログイン成功時のレスポンス
        return response()->json(Auth::user());
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'ログアウトしました']);
    }

    /**
     * ログイン中のユーザー情報を取得
     */
    public function me(Request $request)
    {
        return response()->json(Auth::user());
    }
}
