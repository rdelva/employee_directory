

function  setupDirectory() {

	//Establish ajax connection

	const  xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {

				let employees = JSON.parse(xhr.responseText);
				let  statusHTML = '';
				

			
			for(var i=0; i < employees.results.length; i++ ){

					statusHTML += `<div id="${employees.results[i].login.username}" class="employeeCard card">
									<img src="${employees.results[i].picture.large}" class="avatar">
									<div class="employeeInfo">
										<h2 class="name"> ${employees.results[i].name.first} ${employees.results[i].name.last}</h2>
										<p class= "email"> ${employees.results[i].email}</p>
										<p class= "city"> ${employees.results[i].location.city}</p>
									</div>

								</div>`;
						
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
	

	let cards = document.querySelectorAll('.card');
	const searchBar = document.querySelector('#search');

	searchBar.addEventListener("keyup", (e) =>{
		if(searchBar.value) {		
			let searchItem = searchBar.value.toLowerCase();
			
				for(let i = 0; i < employees.results.length; i++){
					//get First Name and Last Name
					let name =`${employees.results[i].name.first} ${employees.results[i].name.last}`;
					
					
					const pattern =  new RegExp(searchItem.toLowerCase());
					let ifFound = pattern.test(name.toLowerCase());	
				
					if(ifFound !== true) {
							document.getElementById(employees.results[i].login.username).style.display = 'none';	
							//document.getElementById(employees.results[i].login.username).classList.add('hidden');

					} else {
						document.getElementById(employees.results[i].login.username).style.display = 'flex';	

					}				
				} 
			
		} else {

			for(let i =0; i < cards.length; i++){
		 		if(cards[i].style.display = 'none'){
		 			cards[i].style.display = 'flex';

		 		}

		}
	}


	});
	






	//if button is not clicked. send in entire list to display modal window
	//if button is clickled add hidden class that don't patch add visible class that match
	//select found items and send to list


	/*const searchBox = document.getElementById('search').value;
	const cards = document.querySelectorAll('card');
	console.log(cards);*/


	/*let submit = document.getElementById('submit');

	submit.addEventListener('click', function(e){

		e.preventDefault();
		let filteredList = [];
					let counter = 0;
					
		let search = document.getElementById('search').value;
		const pattern =  /\d/g; //prevents user from adding a number in the textbox
		let result = "";
		result = search.match(pattern);
	
		if(result == null){
			for(let i = 0; i < employees.results.length; i++){
				//get First Name and Last Name
				let name =`${employees.results[i].name.first} ${employees.results[i].name.last}`;
				
				
				const pattern =  new RegExp(search.toLowerCase());
				let ifFound = pattern.test(name.toLowerCase());	
			
				if(ifFound !== true) {
						document.getElementById(employees.results[i].login.username).style.display = 'none';
						 //let userid = document.getElementById(employees.results[i].login.username);
						 

				} else {
					counter++;
				} 				
			}
		}
	});
	
*/

} 



filteredSearch = function (){
		let cards = document.querySelectorAll('.card');
	//console.log(cards.length);
	let cardTotal = 0;
	//find out how many cards are not hidden

	for(let i = 0; i < cards.length; i++){
		if(!cards[i].classList.contains('card')){
			cardTotal++;
		}
		//console.log(cardTotal);
	}

	
}





function displayModalWindow(employees) {


	const directory = document.getElementById('directory');
	
	const modalClose = document.querySelector('.modal-close');
	const cards  = document.getElementsByClassName('card');
	const hidden = document.querySelector('.hidden');


	directory.addEventListener('click', (event) => {
	

		let cardClicked;

		if (event.target.tagName == "DIV") {				
			hidden.style.display = "block";			
			cardClicked  = event.target.id;
			event.target.classList.add('current');
			displayModal(employees, cardClicked);
				
		}

	


	});

	modalClose.addEventListener('click', function(e){
	
		hidden.style.display = 'none';

	});

} // end of displayModalWindow
		





function displayModal(employees, cardClicked){	

	
	let cards = document.querySelectorAll('.card');
	let counter = 0;
	
	for(let i=0; i < cards.length; i++){
		if(!cards[i].style.display == 'none'){

			console.log("Hi");

		}

	}

	let modalHTML = "";
	if( employees != undefined && cardClicked != undefined){

		

		for(let i = 0; i < employees.results.length; i++){

	
			if (cardClicked == employees.results[i].login.username) {

				//Hides first arrow  in queue
				
								
					modalHTML += `<img class="avatar" src="${employees.results[i].picture.large}"> 
				 					<h2 class="name"> ${employees.results[i].name.first} ${employees.results[i].name.last} </h2>				
									<p class="email"> ${employees.results[i].email} </p>
									<p class="city"> ${employees.results[i].location.city} </p>		
									<hr>
									<p>  ${ employees.results[i].phone}</p>		
									<p class=address> ${employees.results[i].location.street.number} ${employees.results[i].location.street.name}, ${employees.results[i].location.city},   ${employees.results[i].location.postcode}  </p>`;

									let dateConvert = new Date(employees.results[i].dob.date);
									modalHTML += `<p>Birthday: ${dateConvert.getMonth()}/ ${dateConvert.getDay()}/${dateConvert.getYear()}</p>`;				
				
					document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;	
			}

		}

	}

}// end of displayModal





function navigation(employees) {
	
//Click right arrow
// looks for current item
// remove current class from current item
// go move current class to next item
	
	let current;
	let nextItem = "";
	let prevItem ="";
	let modalHTML ="";
	const rightArrow = document.getElementById('right');
	const leftArrow = document.getElementById('left');
	const directoryNav  =  document.querySelector('#directory');

	
	

	rightArrow.addEventListener('click', function(e){

		modalHTML ="";	
			
		document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;		
		

			current = document.querySelector('.current');
			nextItem = current.nextElementSibling;
			//console.log(nextItem.id);
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
	
		});



	leftArrow.addEventListener('click', function(e){

		modalHTML ="";	
			
		document.getElementsByClassName('text-container')[0].innerHTML = modalHTML;		
		

			current = document.querySelector('.current');
			console.log(current);
			prevItem = current.previousElementSibling;
			console.log(prevItem.id);
				if(prevItem != null) {
					current.classList.remove('current');
					prevItem.classList.add('current');

					for(let i = 0; i < employees.results.length; i++){

						if(prevItem.id == employees.results[i].login.username){

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
	
		});



}



setupDirectory();
displayModal();

//displayModalWindow();
//filterSearch();
//filteredSearch();