//Establish ajax connection

const  xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
	if(xhr.readyState === 4 && xhr.status === 200) {

			let employees = JSON.parse(xhr.responseText);
			let  statusHTML = '';
			

			for(var i=0; i < employees.results.length; i++ ){
			
				statusHTML += "<a class='lightbox' href=" +"#"+ employees.results[i].login.username + ">"; 
				statusHTML += "<div class='card'>";
				statusHTML += "<img class='avatar' src=" + employees.results[i].picture.large + ">"; 
				statusHTML += "<div class='employeeInfo'>"; 
				statusHTML += "<h2 class='name'>" + employees.results[i].name.first + " " +  employees.results[i].name.last + "</h2>";				
				statusHTML += "<p class='email'>" +  employees.results[i].email + "</p>";
				statusHTML += "<p class='city'>" +  employees.results[i].location.city + "</p>";
				statusHTML += "</div>";
				statusHTML += "</div>";
				statusHTML += "</a>"; 

				
			
			}

			
			document.getElementById('directory').innerHTML = statusHTML;




	} else {
		console.log(xhr.statusText);
	}

};

xhr.open('GET', 'https://randomuser.me/api?results=12&?nat=us');
xhr.send();

/*$('.moreEmpInfo').hide();*/

$('.lightBox').click(function(){

	alert('Hi');

});
/*
 $(document).ready(function() {


        $('.lightbox').lightBox(); 
        console.log('hi');
     });
*/