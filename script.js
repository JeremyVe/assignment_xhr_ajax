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
	var url, method, async, data, headers;

	var xhr = new XMLHttpRequest();

	url = option.url ? option.url : window.location.href;

	method = option.method ? option.method : "GET";

	async = option.async ? option.async : true;

	data = option.data ? option.data : {};

	headers = option.headers ? option.headers : {};


	if (!option.success) {
		option['success'] = function() {
			console.log('success');
		}
	}

	if (!option.error) {
		option['error'] = function() {
			console.log('error');
		}
	}

	if (!option.complete) {
		option['complete'] = function() {
			console.log("complete");
		}
	}


	xhr.addEventListener( "load", function(event) {
		if (xhr.status >= 200 && xhr.status < 300) {
			option.success(xhr.responseText, xhr.statusText, xhr);
		} else {
			option.error(xhr, xhr.statusText, xhr.responseText);
		}

		option.complete(xhr, xhr.statusText);
	});
	

	xhr.addEventListener( "error", function() {
		option.error(xhr, xhr.statusText, xhr.responseText);
		option.complete(xhr, xhr.statusText);
	});


	xhr.open(method, url, async);

	for (var key in headers) {
		xhr.setRequestHeader(key, headers[key]);
	}


	var dataArr = [];
	for (var key in data) {
		dataArr.push(key + "=" + data[key]);
	}

	var dataString = dataArr.join("&");

	url = method === "GET" ? url + "?" + dataString : url;

	if (method === 'POST') {
		xhr.send(dataString);
	} else {
		xhr.send();
	}
	return xhr;
}


$.get = function(option) {
	option.method = "GET";
	$.ajax(option);
}

$.post = function(option) {
	option.method = "POST";
	option.headers = {"Content-type": "application/x-www-form-urlencoded"};
	$.ajax(option);
}

var request1, request2, request3;

window.onload = function() {
	request1 = $.ajax({
		url: "http://reqres.in/api/users?page=2",
		method: "GET"
	})

	request2 = $.get({
		url: "http://reqres.in/api/users?page=2"
	})

	request3 = $.post({
		url: "http://reqres.in/api/users",
		data: {
				title: "New book",
				body: "This is an amazing book about...",
				userId: 1
			}
	})
}






