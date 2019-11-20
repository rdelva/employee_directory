

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
			navigation(employees);
			filterSearch(employees);

				

		} 

	};

	xhr.open('GET', 'https://randomuser.me/api?results=12&nat=us,gb');
	xhr.send();

}
	

function filterSearch(employees){

	let submit = document.getElementById('submit');

	submit.addEventListener('click', function(e){

		e.preventDefault();
		let search = document.getElementById('search').value;
		//console.log(search);
		const pattern =  /\d/g; //finds a digit
		let result = search.match(pattern);
		//console.log(employees.results.length);
		if(result == null){
			for(let i = 0; i < employees.results.length; i++){

				//get First Name and Last Name

				let name = employees.results[i].name.first + employees.results[i].name.last;
				
				console.log(search);
				const pattern =  new RegExp(search);
				let ifFound = pattern.test(name);	
				if(ifFound !== true) {
						document.getElementById(employees.results[i].login.username).style.display = 'none';
				}				
			}
		}
	});
	
	
	



		

		
		/*console.log(search);
		
*/




	

	//get value and assign it to varible
	//compare varible to list
	//if variable has letter keep it displayed if not hide
	//if varible is found in word. 
	//check if word doesn't have a number

	



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
			//navigation(employees, cardClicked);
				
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
	
//Click right arrow
// looks for current item
// remove current class from current item
// go move current class to next item
	
	let itemSelected;	
	let current;
	let nextItem = "";
	let modalHTML ="";
	const rightArrow = document.getElementById('right');
	const leftArrow = document.getElementById('left');
	const directoryNav  =  document.querySelector('#directory');
	//console.log(directoryNav);
	var cards = document.querySelectorAll('a');
	//console.log(cards);
		
	

	rightArrow.addEventListener('click', function(e){		
			
		modalHTML ="";
		
			
		document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;	
		
		if(nextItem !== null) {

			current = document.querySelector('.current');	
			nextItem = current.nextElementSibling;
			console.log(nextItem.id);
				if(nextItem != null) {
					current.classList.remove('current');
					nextItem.classList.add('current');

					for(let i = 0; i < employees.results.length; i++){

						if(nextItem.id == employees.results[i].login.username){

							modalHTML += `<img class='avatar' src="${employees.results[i].picture.large}">`; 
							modalHTML += "<h2 class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</h2>";				
							modalHTML += "<p class='email'>" +  employees.results[i].email + "</p>";
							modalHTML += "<p class='city'>" +  employees.results[i].location.city + "</p>";				
							modalHTML += "<hr>";
							modalHTML += "<p>" +  employees.results[i].phone + "</p>";		
							modalHTML += `<p class=address> ${employees.results[i].location.street.number} ${employees.results[i].location.street.name}, ${employees.results[i].location.city},   ${employees.results[i].location.postcode}  </p>`;

							let dateConvert = new Date(employees.results[i].dob.date);
							modalHTML += `<p>Birthday: ${dateConvert.getMonth()}/ ${dateConvert.getDay()}/${dateConvert.getYear()}</p>`;				
						
							//document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;					
					}

			}
				}

			document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;		
		}
		

		
		
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
filterSearch();
