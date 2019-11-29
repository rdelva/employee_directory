

function  setupDirectory() {

	//Establish ajax connection

	const  xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {

				let employees = JSON.parse(xhr.responseText);
				let  statusHTML = '';
				

			
			for(var i=0; i < employees.results.length; i++ ){

					statusHTML += `<a id="${employees.results[i].login.username}" class="employeeCard">
									<div class="card">
									<img src="${employees.results[i].picture.large}" class="avatar">
									<div class="employeeInfo">
										<h2 class="name"> ${employees.results[i].name.first} ${employees.results[i].name.last}</h2>
										<p class= "email"> ${employees.results[i].email}</p>
										<p class= "city"> ${employees.results[i].location.city}</p>
									</div>
									</div>

								</a>`;
						
			}// end of for loop for employees


			document.getElementById('directory').innerHTML = statusHTML;

			let cardClicked; // Why do I have to declare a varible here?

			filterSearch(employees);
			displayModalWindow(pullList);				
			displayModal(employees);
			navigation(employees);
			
		


				

		} 

	};

	xhr.open('GET', 'https://randomuser.me/api?results=12&nat=us,gb');
	xhr.send();

}



function filterSearch(employees){
	

	let cards = document.querySelectorAll('.employeeCard');
	const searchBar = document.querySelector('#search');
	let idName; 
	let idName2;

	searchBar.addEventListener("keyup", (e) =>{
		if(searchBar.value) {		
			let searchItem = searchBar.value.toLowerCase();
			
				for(let i = 0; i < employees.results.length; i++){
					//get First Name and Last Name
					let name =`${employees.results[i].name.first} ${employees.results[i].name.last}`;					
					const pattern =  new RegExp(searchItem.toLowerCase());
					let ifFound = pattern.test(name.toLowerCase());	
				
					if(ifFound == true) {
							//document.getElementById(employees.results[i].login.username).style.display = 'flex';
							idName = employees.results[i].login.username;
							 let idName2 = document.getElementById(idName);
							 idName2.classList.add('visible');
							 idName2.classList.remove('hideCard');
							 //console.log(idName2);

		
					} else {
					
						//document.getElementById(employees.results[i].login.username).style.display = 'none';

						idName = employees.results[i].login.username;
						let idName3 = document.getElementById(idName);
						idName3.classList.remove('visible');
						idName3.classList.add('hideCard');


					
					}				
				} 
			
		} else {
			
			for(let i =0; i < cards.length; i++){
		 		if(cards[i].classList.contains('hideCard')){
		 			//cards[i].style.display = 'flex';
		 			cards[i].classList.remove('visible');
		 				cards[i].classList.remove('hideCard');

		 		}

		}
	}



	});
	


} // end of filterSearch


	

function pullList(){
// only selects cards that match the search

	let cardList = document.getElementsByClassName('employeeCard');
	let displayedCard = [];
			
	for(let i=0; i < cardList.length; i++){
		if(cardList[i].style.display == 'flex'){
							
		// puts the match searches in a list
			displayedCard.push(cardList[i]);				
					
		}
	}
		
			
			//console.log(displayedCard);
			

}









function displayModalWindow(pullList) {

	const directory = document.getElementById('directory');
	
	const modalClose = document.querySelector('.modal-close');
	const cards  = document.getElementsByClassName('employeeCard');
	const hidden = document.querySelector('.hidden');

let cardFlagged = false;
	directory.addEventListener('click', (event) => {

			if (event.target.tagName == "A") {				
						
						let cardClicked = event.target.id;						
						document.getElementById(cardClicked).classList.add('current');
						console.log(cardClicked);
						hidden.style.display = "block";
						displayModal(cardClicked);
						/*cardFlagged = true;
						
						if(cardFlagged == true){
									let prevCurrent = document.querySelector('.current');
									console.log(prevCurrent);
							 		prevCurrent.classList.remove('current');

						}
						 */
						
						 
			}



	

		
				
		

	
		
	});

	modalClose.addEventListener('click', function(e){
	
		hidden.style.display = 'none';

	});



} // end of displayModalWindow
		





function displayModal(employees, cardClicked){	

	
let current = document.querySelector('.current');
//console.log(cardClicked);
//console.log(employees);

	let modalHTML = "";
	if( employees != null && cardClicked != undefined){

		

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
			
			//selects the card that was clicked
			let current  = document.querySelector('.current');
			
			current = document.querySelector('.current');
			nextItem = current.nextElementSibling;
			//console.log(nextItem.id);
				if(nextItem != null && (nextItem.style.display == 'flex')) {
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

//pullList();


//filterSearch();
//filteredSearch();