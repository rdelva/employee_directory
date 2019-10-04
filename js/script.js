//Establish ajax connection

const  xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4 && xhr.status === 200) {
			
			console.log(xhr.responseText);
			//document.getElementById('directory').innerHTML = xhr.responseText;
			
	} else {
		console.log(xhr.statusText);
	}

};

xhr.open('GET', 'https://randomuser.me/api');
xhr.send();
