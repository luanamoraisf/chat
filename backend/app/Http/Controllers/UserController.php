<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::orderBy('created_at', 'desc')->paginate(10);

        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|string|max:100',
            'password' => 'required|string|min:5|max:20'
        ]);

        $user = new User();

        $user->name = $validateData['name'];
        $user->email = $request->email;
        $user->password = bcrypt($validateData['password']);

        $user->save();

        if($request->expectsJson()){
            return response()->json(['message' => 'Usuário Cadastrado com sucesso!'], 200);
        }
        else if($request->isMethod('post') && !$request->ajax()) {
            return redirect()->route(users.index)->with('success', 'Usuário Cadastrado com sucesso!');
        }
        else {
            abort(400, 'Tipo de requisição não suportada.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->passaword
        ]); 

        return response()->json(['message' => 'Usuário atulizado!'], $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id)->delete();
        return response()->json(['message' => 'Usuário deletado!'], 200);
    }
}
