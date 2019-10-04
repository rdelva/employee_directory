//Establish ajax connection

const  xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4 && xhr.status === 200) {

			let employees = JSON.parse(xhr.responseText);
			let  statusHTML = '<ul class="employeeList">';
			console.log(employees.length);

			for(var i=0; i < employees.results.length; i++ ){
			
				statusHTML += "<li>" +  employees.results[i].name.first + "</li>";
			}

			statusHTML += '</ul>';
			document.getElementById('directory').innerHTML = statusHTML;




	} else {
		console.log(xhr.statusText);
	}

};

xhr.open('GET', 'https://randomuser.me/api?results=12');
xhr.send();
