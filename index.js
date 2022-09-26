function saveToLocal(event) {
	event.preventDefault();
	//defining variable to both the entities of the UI 
	const name = event.target.name.value;
	const email = event.target.email.value;

	//creating object so that we can access it
	const obj = {
		name,
		email,
	};


	//checking whether the mail we have entred do not belong to any one else in the list already
	if (localStorage.getItem(obj.email)!==null) {
        removeSameUser(email);
    }

	// Assigning details to local storage
	// localStorage.setItem(email, JSON.stringify(obj));

	axios.post("https://crudcrud.com/api/f2c419b4cb9641de9a008ce099a92b9b/appointmentData2",obj)
	.then((response)=>{
		getUserList(response.data);
		console.log(response);
	})
	.catch((err)=>{
		document.body.innerHTML+="<h1>Something went wrong</h1>";
		console.log(err);
	})
	// Getting details from local storage
	let getItems = JSON.parse(localStorage.getItem(email));
	console.log(getItems);

	getUserList(getItems);


	// Need to ask about refresh thing
}

window.addEventListener("DOMContentLoaded", ()=>{
	axios.get("https://crudcrud.com/api/f2c419b4cb9641de9a008ce099a92b9b/appointmentData2")
	.then((response)=>{
		console.log(response.data);
		for(var i=0;i<response.data.length;i++){
			getUserList(response.data[i]);
		}
	})
	.catch((err)=>{
		document.body.innerHTML+="<h1>Something went wrong</h1>";
		console.log(err);
	})


	// const lcStObj=localStorage;
	// const lcStKey=Object.keys(lcStObj);
	// for (let index = 0; index < lcStKey.length; index++) {
	// 	const key=lcStKey[index];
	// 	const string=lcStObj[key];
	// 	const userListObj=JSON.parse(string);
	// 	console.log(userListObj);
		
	// 	getUserList(userListObj);
	// }

})


function getUserList(user) {
	document.getElementById('name').value='';
	document.getElementById('email').value='';
	// if (localStorage.getItem(user.email)!==null) {
	// 	removeUserFromScreen(user.email);
	// }


	const pntNode=document.getElementById('userList');

	const childNode=`<li id=${user.email}>${user.name}-${user.email}
	<button onclick=deleteUser("${user.email}")>DeleteUser</button>
	<button onclick=editUser('${user.name}','${user.email}')>EditUser</button>
	</li>`;

	pntNode.innerHTML=pntNode.innerHTML+childNode;
    //taking any variable to store or access the ul or li tag and insert all the node we want
	// const userList = document.getElementById("userList");

	// //taking listArr variable to store all the nodes we have already in the list
	// const listArr = Object.values(user);

	// //printing all the node we have
	// console.log(`listArr --> ${listArr}`);

	// //creating the first node i.e li 
	// const li = document.createElement("li");

	// //giving id to it so that we can access it
	// li.id=user.email;

	// //adding to the list of li tag with the appendChild function and creating node side by side
	// li.appendChild(document.createTextNode(`${user.name}, ${user.email}`));

    // //li.appendChild(document.createTextNode(`<button onclick="deleteUser(${user.email})">Delete User</button>`));
	// li.innerHTML+=`<button onclick=deleteUser("${user.email}")>DeleteUser</button>`;

	// li.innerHTML+=`<button onclick=editUser('${user.name}','${user.email}')>EditUser</button>`;

	// // // const childHTML = `<li>${key}</li>`;
	// userList.appendChild(li);
}

function editUser(name,email){
	document.getElementById('name').value=name;
	document.getElementById('email').value=email;
	deleteUser(email);
}

function deleteUser(email){
	console.log(email);
	localStorage.removeItem(email);
	removeUserFromScreen(email);
}

function removeSameUser(email){
    const parentNode=document.getElementById('userList');
    const childNodeToBeDeleted=document.getElementById(email);
	
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}


function removeUserFromScreen(email){
	const parentNode=document.getElementById('userList');
	console.log(parentNode);
	const childNodeToBeDeleted=document.getElementById(email);
	console.log(childNodeToBeDeleted);

	parentNode.removeChild(childNodeToBeDeleted);
}