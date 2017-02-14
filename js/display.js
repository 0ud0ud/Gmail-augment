/*
 * Check the Local storage to get the emails from the feed
 * Then add the element to the popup html -> display.html
 */

if (localStorage != "undefined") { //Always true on Chrome

	var nEmails = localStorage.getItem("0");
	var header = document.getElementById('title');
	var content = document.getElementById('content');

	header.innerHTML = nEmails + ' New Messages';
	content.appendChild(header);

	//Populate the unread emails
	for (var i = 0; i < nEmails; i++) {
		var div = document.createElement('div');
		var panelTitle = document.createElement('div');
		var panelBody = document.createElement('div');
		var link = document.createElement('a');

		link.href = localStorage.getItem("link" + i);
		link.target = "_blank";

		div.className = "panel panel-default";
		content.appendChild(link);
		link.appendChild(div);
		panelTitle.className = "panel-heading";
		panelBody.className = "panel-body";

		panelTitle.innerHTML = localStorage.getItem("title" + i);
		panelBody.innerHTML = localStorage.getItem("summary" + i);
		div.appendChild(panelTitle);
		div.appendChild(panelBody);

		//Display only 20 new emails
		if (i == 20) {
			i = nEmails;
		}
	}
}