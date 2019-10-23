

function  setupDirectory() {

	//Establish ajax connection

	const  xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {

				let employees = JSON.parse(xhr.responseText);
				let  statusHTML = '';
				


			for(var i=0; i < employees.results.length; i++ ){
				
					statusHTML += `<a class="lightbox employeeCard" href="#${employees.results[i].login.username}" id="${employees.results[i].login.username}">`; 
					statusHTML += "<div class='card'>";
					statusHTML += "<img class='avatar' src=" + employees.results[i].picture.large + ">"; 
					statusHTML += "<div class='employeeInfo'>"; 
					statusHTML += "<h2 class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</h2>";				
					statusHTML += "<p class='email'>" +  employees.results[i].email + "</p>";
					statusHTML += "<p class='city'>" +  employees.results[i].location.city + "</p>";
					statusHTML += "</div>";
					statusHTML += "</div>";
					statusHTML += "</a>"; 	



						
			}// end of for loop for employees

			displayModalWindow(employees);	
			document.getElementById('directory').innerHTML = statusHTML;

				

		} else {
			
		}

	};

	xhr.open('GET', 'https://randomuser.me/api?results=12&?nat=us');
	xhr.send();

}
	



function displayModalWindow(employees) {


	let directory = document.querySelector('#directory');
	let modalClose = document.querySelector('.modal-close');

	directory.addEventListener('click', function(e){

		let overlay = document.querySelector('overlay');
		let employeeCard = document.querySelectorAll('employeeCard');
		
		let cardClicked;
		

		if (e.target.tagName == "A") {				
			hidden.style.display = "block";			
			cardClicked  = e.target.id;
			displayModal(employees, cardClicked);
				
		}
	});


	let hidden = document.querySelector('.hidden');

	modalClose.addEventListener('click', function(e){
	
		hidden.style.display = 'none';

	});

} // end of displayModalWindow
		





function displayModal(employees, cardClicked){	
	

	//look for the the href


let modalHTML = "";
	if( employees != undefined && cardClicked != undefined){

		

		for(let i = 0; i < employees.results.length; i++){

	
		if (cardClicked == employees.results[i].login.username) {

							
				modalHTML += `<img class='avatar' src="${employees.results[i].picture.large}">`; 
				modalHTML += "<h2 class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</h2>";				
				modalHTML += "<p class='email'>" +  employees.results[i].email + "</p>";
				modalHTML += "<p class='city'>" +  employees.results[i].location.city + "</p>";				
				modalHTML += "<hr>";
				modalHTML += "<p>" +  employees.results[i].phone + "</p>";		
				modalHTML += `<p class=address> ${employees.results[i].location.street.number} ${employees.results[i].location.street.name}, ${employees.results[i].location.city},   ${employees.results[i].location.postcode}  </p>`;

				let dateConvert = new Date(employees.results[i].dob.date);
				modalHTML += `<p>Birthday: ${dateConvert.getMonth()}/ ${dateConvert.getDay()}/${dateConvert.getYear()}</p>`;				
			
				document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;	
	

		}

	}

	}

}

setupDirectory();
displayModalWindow();
displayModal();