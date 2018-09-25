<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Document</title>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
	<div class="container">
		<div class="row" id="app">
			<ul class="list-group offset-4 col-4">
			  <li class="list-group-item">Chat Room</li>
			  <message v-for="value in chat.message" :msg="value" ></message>
			  <br>
			  <input type="text" v-model="message" @keyup.enter="sendMsg" clas="form-control" placeholder="Type your message here">

			</ul>
		</div>
	</div>

	<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>