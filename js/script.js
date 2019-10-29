

function  setupDirectory() {

	//Establish ajax connection

	const  xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {

				let employees = JSON.parse(xhr.responseText);
				let  statusHTML = '';
				


			for(var i=0; i < employees.results.length; i++ ){
				
					statusHTML += `<a  href="#${employees.results[i].login.username}" id="${employees.results[i].login.username}" class="employeeCard">`; 
					statusHTML += "<div class='card'>";
					statusHTML += "<img class='avatar' src=" + employees.results[i].picture.large + ">"; 
					statusHTML += "<div class='employeeInfo'>"; 
					statusHTML += "<h2 class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</h2>";				
					statusHTML += "<p class='email'>" +  employees.results[i].email + "</p>";
					statusHTML += "<p class='city'>" +  employees.results[i].location.city + "</p>";
					statusHTML += "</div>";
					statusHTML += `</div>`;
					statusHTML += `</a>`; 	



						
			}// end of for loop for employees

			displayModalWindow(employees);	
			document.getElementById('directory').innerHTML = statusHTML;
			navigation();

				

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
			e.target.classList.add('current');
			displayModal(employees, cardClicked);
			navigation(employees, cardClicked);
				
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





function navigation(employees) {
	
	
	const rightArrow = document.getElementById('right');
	const leftArrow = document.getElementById('left');
	
	const directoryNav  =  document.querySelector('#directory');
	//console.log(directoryNav);
	var cards = document.querySelectorAll('a');
	console.log(cards);


	
//Click right arrow
// looks for current item
// remove current class from current item
// go move current class to next item


	
	let itemSelected;

	rightArrow.addEventListener('click', function(e){		
			

		let current = directory.querySelector('.current');	
		console.log(current);

		current.classList.remove('current');	
		let nextItem = current.nextElementSibling;
		//console.log(nextItem);

		nextItem.classList.add('current');

		current = directory.querySelector('.current');	
		//console.log(current);
		/*let headList = current[0].parentNode;
		console.log(headList);
		itemSelected = current;*/
		//itemSelected.classList.remove = current;

		
		
	/*
		let modalHTML ="";
			
			document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;




			for(let i = 0; i < items.length; i++){

				if(items[i].className =='current'){

			
					//console.log(employees);
					

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

			*/

	

		});


}



setupDirectory();
displayModalWindow();
displayModal();

