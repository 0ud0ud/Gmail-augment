/*
	function that is called when gmail is opened
	for the first time and then redefine itself
	so it's called once only
*/
var firstCall = function () {
	firstCall = function () {};
	console.log('first call');
	var currentUrl = document.location.href,
		patt = /^https:\/\/mail\.google\.com\/mail\/u\/0\/#inbox\/[a-f0-9]{16}$/g; //regex email open
	if (patt.test(currentUrl)) {
		emailOpened();
	} else {
		addButton();
		emailNotOpened();
	}
};



/*
	Function called when the location change
*/
var locationHasChanged = function () {
	var currentUrl = document.location.href,
		patt = /^https:\/\/mail\.google\.com\/mail\/u\/0\/#inbox\/[a-f0-9]{16}$/g; //regex email open
	if (patt.test(currentUrl)) {
		emailOpened();
	} else {
		emailNotOpened();
	}
};


//Event when location.href changes 
window.onpopstate = locationHasChanged;

firstCall();


/*
	Function when an email is opened
	example: Unsubscribe function
*/
function emailOpened() {
	console.log("BLABLABLA");
}


/*
	Function when an email is NOT opened
	example: Task button
*/
function emailNotOpened() {
	console.log("blibliblib");
}



/*
	Add a button to the Gmail DOM
	Doing an Async call to let the DOM load before to insert the button
*/
function addButton() {
	setTimeout(function () {
		var button = document.createElement("button");
		wrapper = document.createElement("div");
		button.id = "test";
		button.innerHTML = "test";
		button.className = "T-I J-J5-Ji nu T-I-ax7 L3";
		$("#\\:5").append(button);
		$("#test").click(function () {
			alert("it works");
		});
	}, 1000);
}