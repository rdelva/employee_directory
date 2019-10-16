/*
1. Pull Data from API to build out cards
2. Select Card and grab the id number
3. bA




*/

//Establish ajax connection

const  xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
	if(xhr.readyState === 4 && xhr.status === 200) {

			let employees = JSON.parse(xhr.responseText);
			let  statusHTML = '';
			let  modalHTML = '';

		for(var i=0; i < employees.results.length; i++ ){
			
				statusHTML += `<a class="lightbox employeeCard" href="#${employees.results[i].login.username}">`; 
				statusHTML += "<div class='card'>";
				statusHTML += "<img class='avatar' src=" + employees.results[i].picture.large + ">"; 
				statusHTML += "<div class='employeeInfo'>"; 
				statusHTML += "<h2 class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</h2>";				
				statusHTML += "<p class='email'>" +  employees.results[i].email + "</p>";
				statusHTML += "<p class='city'>" +  employees.results[i].location.city + "</p>";
				statusHTML += "</div>";
				statusHTML += "</div>";
				statusHTML += "</a>"; 		

				modalHTML += "<img class='avatar' src=" + employees.results[i].picture.large + ">"; 
				modalHTML += "<h2 class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</h2>";				
				modalHTML += "<p class='email'>" +  employees.results[i].email + "</p>";
				modalHTML += "<p class='city'>" +  employees.results[i].location.city + "</p>";				
				modalHTML += "<hr>";
				modalHTML += "<p>" +  employees.results[i].phone + "</p>";		
				modalHTML += `<p class=address> ${employees.results[i].location.street.number} ${employees.results[i].location.street.name}, ${employees.results[i].location.city},   ${employees.results[i].location.postcode}  </p>`;

				let dateConvert = new Date(employees.results[i].dob.date);
				//console.log(dateConvert.getMonth());
				modalHTML += `<p>Birthday: ${dateConvert.getMonth()}/ ${dateConvert.getDay()}/${dateConvert.getYear()}</p>`;	

					
			}

			displayModal(employees);	
			document.getElementById('directory').innerHTML = statusHTML;

			

	} else {
		console.log(xhr.statusText);
	}

};

xhr.open('GET', 'https://randomuser.me/api?results=12&?nat=us');
xhr.send();



		

			let overlay = document.querySelector('overlay');
			let directory = document.querySelector('#directory');
			let employeeCard = document.querySelectorAll('employeeCard');
			let hidden = document.querySelector('.hidden');
			let modalClose = document.querySelector('.modal-close');
			let cardClicked;
		
			directory.addEventListener('click', function(e){
				if (e.target.tagName == "A") {				
					//console.log(e.target.getAttribute('href'));				
					hidden.style.display = "block";
				 	cardClicked  = e.target.getAttribute('href');					
					displayModal(null, cardClicked);
				}
			});


			modalClose.addEventListener('click', function(e){
				hidden.style.display = 'none';
			});


			function displayModal(employees, cardClicked){
			
				console.log(`Test ${cardClicked}`);
				console.log(employees);

				for (let i=0; i < employees.length; i++  ){
					console.log(modalHTML);
				}


			}

			