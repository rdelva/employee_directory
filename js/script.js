//Establish ajax connection

const  xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4 && xhr.status === 200) {

			let employees = JSON.parse(xhr.responseText);
			let  statusHTML = '<ul class="employeeList">';
			console.log(employees.length);

			for(var i=0; i < employees.results.length; i++ ){
			
				statusHTML += "<li>"; 
				statusHTML += "<img class='photo' src=" + employees.results[i].picture.large + ">"; 
				statusHTML += "<div class='employeeInfo'>"; 
				statusHTML += "<div class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</div>";				
				statusHTML += "<div class='email'>" +  employees.results[i].email + "</div>";
				statusHTML += "<div class='city'>" +  employees.results[i].location.city + "</div>";
				statusHTML += "</div>";
				statusHTML += "</li>"; 
			}

			statusHTML += '</ul>';
			document.getElementById('directory').innerHTML = statusHTML;




	} else {
		console.log(xhr.statusText);
	}

};

xhr.open('GET', 'https://randomuser.me/api?results=12');
xhr.send();
