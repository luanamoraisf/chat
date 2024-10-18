<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function createAccessToken(Request $request){

        $request->validate([ 
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $token = $user->createToken('NomedoToken')->accessToken;
        return response()->json(['accessToken' => $token], 200);

    }
}
