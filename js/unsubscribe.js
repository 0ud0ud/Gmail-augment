var timer = setInterval(function () {
	var currentUrl = document.location.href,
		patt = /^https:\/\/mail\.google\.com\/mail\/u\/0\/#inbox\/[a-f0-9]{16}$/g; //regex email open
	if (patt.test(currentUrl)) {
		console.log("email opened");
		clearInterval(timer);
	}
}, 1000);