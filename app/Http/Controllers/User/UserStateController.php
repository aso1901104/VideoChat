<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use Storage;

class UserStateController extends Controller
{
    public function updateUserData(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|max:191',
                'email' => 'required|email',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag()->toArray(),
            ], 400);
        }
        $user = auth()->user();
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        return response()->json([
            'user' => $user,
        ]);
    }

    public function uploadImage(Request $request)
    {
        $user = auth()->user();
        $file = $request->file('img');
        $path = Storage::disk('s3')->put("userThumbnail/user{$user->id}", $file, 'public');
        $url = Storage::disk('s3')->url($path);
        $user->update([
            'pic_path' => $url,
        ]);
        return response()->json([
            'url' => $url,
        ]);
    }
}
