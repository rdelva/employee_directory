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
		card.classList.add('current');	
		displayModal(index);
		//directionalArrows(card);
		
	
		
		

	}

});

//Directional Arrows

function directionalArrows(){

	const next = document.getElementById('right');
	const prev  = document.getElementById('left');
	// = card;
	
	next.addEventListener('click', (e) => {
		
		let current = document.querySelector('.current');
		console.log(current);
		const index = current.getAttribute("data-index");
		console.log(index);


		let list = document.querySelectorAll('.card');
		let modalList = [];

		for(let i = 0; i < list.length; i++){
			if(!list[i].classList.contains('hideCard') ){
				modalList.push(list[i]);
			}
				console.log(modalList[i]);
		}
	
		modalContainer.innerHTML = '';
	
	

		
		
	
		
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
