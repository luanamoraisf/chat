<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\NewMessage;

class MessageController extends Controller
{
    public function testBroadcast(){
        $data = [
            'message' => 'Esta é uma mensagem de teste',
            'user' => [
                'id' => 1,
                'name' => 'Luana',
            ],
        ];

        broadcast(new NewMessage($data))->toOthers();

        return response()->json(['status' => 'Evento de broadcast disparado com sucesso!', 'data' => $data]);
    }
}
