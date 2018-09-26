<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\ChatEvent;

class ChatController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}


    //
	public function chat()
	{
		return view('chat');
	}

	public function send()
	{
		$message = "Hello World";
		$user = User::find(Auth::id());
		event(new ChatEvent($message, $user));
	}

}
