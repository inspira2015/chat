<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Document</title>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
	<style>
		.list-group {
			overflow-y: scroll;
			height:  200px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="row" id="app">
			<div class="offset-4 col-4">
				<li class="list-group-item">Chat Room</li>

				<ul class="list-group" v-chat-scroll>
			  		<message v-for="(value, index) in chat.message"
			  		         :msg="value"
			  		         :key="value.index"
			  		         :color="chat.color[index]"
			  		         :user="chat.user[index]"></message>
				</ul>
		  	<input type="text" v-model="message" @keyup.enter="sendMsg" clas="form-control offset-4 col-4" placeholder="Type your message here">
			</div>
		</div>
	</div>

	<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>