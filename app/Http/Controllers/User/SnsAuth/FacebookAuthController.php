<?php

namespace App\Http\Controllers\User\SnsAuth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\User;
use Auth;

class FacebookAuthController extends Controller
{
    //ログインボタンからリンク
    public function facebookLogin()
    {
        return Socialite::driver('facebook')->redirect();
    }
    //Callback処理
    public function handleProviderCallback()
    {
        //ソーシャルサービス（情報）を取得
        $userSocial = Socialite::driver('facebook')->stateless()->user();
        $input['email'] = $userSocial->getEmail();
        $input['name'] = $userSocial->getName();
        $input['provider'] = 'facebook';
        $input['provider_id'] = $userSocial->getId();
        $input['pic_path'] = $userSocial->avatar_original;
        $checkIfExist = User::where('provider', $input['provider'])
            ->where('provider_id', $input['provider_id'])
            ->first();
        if ($checkIfExist) {
            Auth::login($checkIfExist, true);
            return redirect()->secure('/create-room');
        } else {
            $chkEmailExits = User::where('email', $input['email'])->first();
            if ($chkEmailExits) {
                session()->flash('flash_message', 'Email này đã được sử dụng cho tài khoản khác');
                return redirect()->secure('/login');
            } else {
                $nowCreatedUser = User::create($input);
                Auth::login($nowCreatedUser, true);
                return redirect()->secure('/create-room');
            }
        }
    }
}
