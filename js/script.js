// global variables
let employees = [];
const urlAPI = "https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US";
const  gridContainer = document.querySelector("#grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose  = document.querySelector(".modal-close");


fetch(urlAPI)
	.then(res => res.json())
	.then(res => res.results)
	.then(displayEmployees)
	.catch(err => console.log(err));


function displayEmployees(employeeData){

	employees = employeeData;
	//console.log(employees);
	let employeesHTML = "";

	employees.forEach((employee, index) => {
		let name = employee.name;
		let email = employee.email;
		let city = employee.location.city;
		let picture = employee.picture;


		employeesHTML += `
		<div class="card" data-index="${index}">
			<div class="card-info">
				<img class="avatar" src="${picture.large}"/>
				<div class="text-container">
					<h2 class="name">${name.first} ${name.last}</h2>
					<p class="email">${email}</p>
					<p class="address">${city}</p>
				</div>
			</div>
		</div>
	`;


	});


		gridContainer.innerHTML = employeesHTML;

}


function displayModal(index){

	let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

	let date = new Date(dob.date);

	const modalHTML = `
		<img class ="avatar" src="${picture.large} " />
		<div>
			<h2 class="name">${name.first} ${name.last}</h2>
			<p class="email">${email}</p>
			<p class="address">${city}</p>
			<hr/>
			<p>${phone}</p>
			<p class="address"> ${street.number} ${street.name} , ${state} ${postcode}</p>
			<p>Birthday: ${date.getMonth()}/${date.getDate()}/ ${date.getFullYear()}</p>
		</div>

	`;

	overlay.classList.remove("hidden");
	modalContainer.innerHTML = modalHTML;


}


gridContainer.addEventListener('click', e => {

	//only targets the cards in employee directory
	if(e.target !== gridContainer){

		const card = e.target.closest(".card");
		const index = card.getAttribute("data-index");
		displayModal(index);
		directionalArrows(index);
		const cards = document.querySelectorAll('.card');

		//scrubs list to see if a card was selected
		for(let i=0; i < cards.length; i++){
			if(cards[i].classList.contains('current')){
				cards[i].classList.remove('current');
			}
		}
	
		card.classList.add('current');
		

	}

});

//Directional Arrows

function directionalArrows(){

	const next = document.getElementById('right');
	const prev  = document.getElementById('left');
	//let currentCard = parseInt(index);
 	
	next.addEventListener('click', (e) => {
	
		let card = document.querySelectorAll('.card');
	
		let list = [];


		//Builds the  list of displayed cards
		for(let i = 0; i < card.length; i++){
			if(!card[i].classList.contains('hideCard')){
				list.push(card[i]);
			}
			
		}

		//find the current card and get the index number for the card
		let current = document.querySelector('.current');
		let index  = parseInt(current.getAttribute('data-index'));
		current.classList.remove('current');
		if(list[index + 1] !== null){			
			list[index + 1].classList.add('current');
			let newIndex = list[index+1].getAttribute('data-index');
			displayModal(newIndex);
			
		}
		
				


		//remove the current class from current card

		// add it to the next card that doesn't have hideCard




		/*
		for(let i = 0; i < list.length; i++){ //looks at the next card
			if(list[i].classList.contains('current')){
				list[i].classList.remove('current');

					if()
					list[i + 1].classList.add('current');
				 	let index = list[i + 1].getAttribute('data-index');
					
					displayModal(index);
			
			

			}

		}*/

		

		
	/*	if(!nextEl.classList.contains('hideCard')) {
			current.classList.remove('current');
			nextEl.classList.add('current');	
			displayModal(nextEl.getAttribute('data-index'));
		} else {
			nextEl.next;
		}*/

//get the index starting point based on which item i click on. 
// check the next item over if it does have the hide card. go to the next one
// if it doesn't have hide card send the value to display modal and end the loop

	

		
		
	
		
	});


	prev.addEventListener('click', (e) => {
		
	});


}



modalClose.addEventListener('click', (e) => {
	overlay.classList.add("hidden");
});




function searchEmployee(){
	let search = document.querySelector('#search');

	const cards = document.getElementsByClassName('card');
				

	let list = [];
	let result = ''; 
	search.addEventListener('keyup', e => {

		result = search.value.toLowerCase();
		
		//Note wanted to try and use filter for this. Was uncessful need to ask for help
		//better way to use classes instead replying on style

		for(let i = 0; i < cards.length; i++){

			 let cardName = cards[i].querySelector('.name').innerHTML.toLowerCase();
			  let match = cardName.includes(result);	
			
			 if(match) {
			 	if(cards[i].classList.contains('hideCard')){
			 			cards[i].classList.remove('hideCard');
			 	}			 
				 
			} else {				
				
				cards[i].classList.add('hideCard');
					
			}

		}



	});
}




	



directionalArrows();
searchEmployee();
