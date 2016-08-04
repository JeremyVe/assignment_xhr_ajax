// // Get a list of users in JSON form
// var xhr = new XMLHttpRequest();
// xhr.addEventListener( "load", function(){
//     // console.log( this.responseText );
// });
// xhr.open("GET", "http://reqres.in/api/users", true);
// xhr.send();


// Create a post
var xhr = new XMLHttpRequest();
xhr.addEventListener( "load", function(){
    // console.log( this.responseText );
});
xhr.open("POST", "http://reqres.in/api/posts", true);
xhr.send("title=Foo&body=Bar&userId=1");


var $ = {};

$.ajax = function(option) {

	option.async = option.async || true;
	option.data = option.data || null;

	var xhr = new XMLHttpRequest();

	xhr.addEventListener( "load", function() {
		var xhrObject = this;
		option.success.call(xhrObject);
		option.complete.call(xhrObject);
	})
	
	xhr.addEventListener( "error", function() {
		var xhrObject = this;
		option.error.call(xhrObject);
		option.complete.call(xhrObject);
	})

	xhr.open(option.method, option.url, option.async);

	xhr.setRequestHeader("Content-type", option.headers);

	if (option.hasOwnProperty("data")) {
		console.log(option.data);
		xhr.send(option.data);
	} else {
		xhr.send();
	}
}

$.get = function(option) {
	option.method = "GET";
	$.ajax(option);
}

$.post = function(option) {
	option.method = "POST";
	$.ajax(option);
}


