<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Room;

use Validator;

class CreateRoomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function createRoom(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'regex:/^[a-zA-Z0-9]+$/|unique:rooms',
            ],
            [
                'name.regex' => '英数字だけにしてください。',
                'name.unique' => 'この部屋は既に存在しています。'
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag()->toArray(),
            ], 400); // HTTP code for an invalid request
        }
        $room = new Room([
            'name' => $request->name,
        ]);
        $user = auth()->user();
        $user->rooms()->save($room);
        $rooms = $user->rooms;
        return response()->json([
            'rooms' => $rooms,
        ]);
    }

    public function getMyRooms()
    {
        $user = auth()->user();

        $rooms = $user->rooms;

        return response()->json([
            'rooms' => $rooms,
        ]);
    }

    public function deleteRoom(Room $room)
    {
        $room->delete();
        $user = auth()->user();
        $rooms = $user->rooms;
        return response()->json([
            'rooms' => $rooms,
        ]);
    }
}
