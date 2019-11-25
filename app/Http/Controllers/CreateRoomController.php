<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Room;

class CreateRoomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function createRoom(Request $request)
    {
        $room = new Room([
            'name' => $request->room_name,
        ]);

        $user = auth()->user();

        $user->rooms()->save($room);

        return response()->json([
            'room' => $room,
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
}
