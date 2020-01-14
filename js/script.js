// global variables
let employees = [];
const urlAPI = "https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US";
const  gridContainer = document.querySelector("#grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose  = document.querySelector(".modal-close");
const next = document.querySelector('#right');
const prev  = document.querySelector('#left');

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
	formattedYear = date.getFullYear().toString().substring(1,3);

	const modalHTML = `
		<img class ="avatar" src="${picture.large} " />
		<div>
			<h2 class="name">${name.first} ${name.last}</h2>
			<p class="email">${email}</p>
			<p class="address">${city}</p>
			<hr/>
			<p>${phone}</p>
			<p class="address"> ${street.number} ${street.name}, ${state} ${postcode}</p>
			<p>Birthday: ${date.getMonth()}/${date.getDate()}/${formattedYear}</p>
		</div>

	`;

	overlay.classList.remove("hidden");


	// Hide the arrows for the first and last card
	const cards = document.querySelectorAll('.card');

	// will only target the arrow but not the space
	const right = document.querySelector('#right img');
	const left = document.querySelector('#left img');
	let cardNumber = parseInt(index); 

	// Hide left arrow for the first card
	if(cardNumber === 0){
		left.style.display = 'none';
	} else {
		left.style.display = 'block';
	}

	// Hide right arrow for last card
	if(cardNumber === cards.length - 1){
		right.style.display = 'none';
	} else {
		right.style.display = 'block';
	}



	modalContainer.innerHTML = modalHTML;
 
}


gridContainer.addEventListener('click', e => {

	//only targets the cards in employee directory
	if(e.target !== gridContainer){

		const card = e.target.closest(".card");
		const index = card.getAttribute("data-index");
		displayModal(index);		
		
		const cards = document.querySelectorAll('.card');
		
		//scrubs to see if another item has the current marker.

		for(let i=0; i < cards.length; i++){
			if(cards[i].classList.contains('current') ){
				cards[i].classList.remove('current');
			}	
		}
		// if no card was selected prior add the current class
		card.classList.add('current');


	}

});

//Directional Arrows

function directionalArrows(){


	next.addEventListener('click', (e) => {
		
		let cards = document.querySelectorAll('.card');		
		let current = document.querySelector('.current');
		let currentIndex = "";
		let newIndex = "";
		
		currentIndex = parseInt(current.getAttribute('data-index'));
		currentIndex+=1;


		if(currentIndex !== cards.length){
			current.classList.remove('current');
			cards[currentIndex].classList.add('current');
			newIndex = parseInt(cards[currentIndex].getAttribute('data-index'));
			displayModal(newIndex);
		}


	});


	prev.addEventListener('click', (e) => {
		
		let cards = document.querySelectorAll('.card');		
		let current = document.querySelector('.current');
		let currentIndex = "";
		let newIndex = "";
		
		currentIndex = parseInt(current.getAttribute('data-index'));
		currentIndex-=1;




		if(currentIndex >  -1){
			current.classList.remove('current');
			cards[currentIndex].classList.add('current');
			newIndex = parseInt(cards[currentIndex].getAttribute('data-index'));
			displayModal(newIndex);
		}



	});


}



modalClose.addEventListener('click', (e) => {
	overlay.classList.add("hidden");
});





function searchEmployee(){
	let search = document.querySelector('#search');
	let list = [];
	const cards = document.getElementsByClassName('card');
				


	let result = ''; 
	search.addEventListener('keyup', e => {

		result = search.value.toLowerCase();
		


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
