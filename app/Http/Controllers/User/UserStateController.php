<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

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
}
