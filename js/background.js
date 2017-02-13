var requestURL = "https://mail.google.com/mail/feed/atom"; //FEED ADDRESS

function getXmlHttp() {
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); //for IE 
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}



function processResponse(response) {
	var cText = "?";
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, 'text/xml');
	var countElem = xml.getElementsByTagName("fullcount")[0];
	if (countElem) {
		var count = parseInt(countElem.textContent);
		cText = (count > 0) ? ("" + count) : "";
	}

	chrome.browserAction.setBadgeText({
		text: cText
	});

	if (cText > 0) {

		localStorage.setItem('0', cText);

		for (var i = 0; i < cText; i++) {
			var title = xml.getElementsByTagName("title")[1 + i].childNodes[0].nodeValue,
				summary = xml.getElementsByTagName("summary")[i].childNodes[0].nodeValue,
				link = xml.getElementsByTagName("link")[1 + i].attributes.getNamedItem("href").nodeValue;

			if (typeof (Storage) !== "undefined") {
				localStorage.setItem('title' + i, title);
				localStorage.setItem('summary' + i, summary);
				localStorage.setItem('link' + i, link);
			} else {
				console.log("No localStorage");
			}
		}
		chrome.browserAction.setPopup({
			popup: "../html/display.html"
		});
	} else {
		chrome.browserAction.setPopup({
			popup: "../html/popup.html"
		});
	}
}

function processError(response) {
	var cText = "?";
	chrome.browserAction.setBadgeText({
		text: cText
	});
}

function updateCounterAB() {
	var xmlhttp = getXmlHttp();
	xmlhttp.open('GET', requestURL, true);
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				processResponse(xmlhttp.responseText);
			} else {
				processError(xmlhttp.responseText);
			}
		}
	};
	xmlhttp.send(null);
	setTimeout(updateCounterAB, 10 * 1000);
}

function main() {
	chrome.browserAction.setBadgeText({
		text: '?'
	});

	chrome.browserAction.setBadgeBackgroundColor({
		color: '#FF0000'
	});

	updateCounterAB();
}

main();