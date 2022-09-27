function saveToLocal(event) {
	event.preventDefault();
	//defining variable to both the entities of the UI 
	const name = event.target.name.value;
	const email = event.target.email.value;
	// const id="new Date().getTime();"


	//creating object so that we can access it
	const obj = {
		name,
		email
	};

// console.log(obj);
	//checking whether the mail we have entred do not belong to any one else in the list already
	// if (localStorage.getItem(obj.email)!==null) {
    //     removeSameUser(email);
    // }

	// Assigning details to local storage
	// localStorage.setItem(email, JSON.stringify(obj));

	axios.post("https://crudcrud.com/api/ab65b2c69e6c40b2a31dca2a40e76160/app",obj)
	.then((response)=>{
		getUserList(response.data);
		// console.log(response.data);
	})
	.catch((err)=>{
		document.body.innerHTML+="<h1>Something went wrong</h1>";
		console.log(err);
	})
	// Getting details from local storage
	// let getItems = JSON.parse(localStorage.getItem(email));
	// console.log(getItems);

	// getUserList(getItems);


	// Need to ask about refresh thing
}

window.addEventListener("DOMContentLoaded", ()=>{
	axios.get("https://crudcrud.com/api/ab65b2c69e6c40b2a31dca2a40e76160/app")
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
	console.log(user);

	const childNode=`<li id=${user._id}>${user.name}-${user.email}
	<button onclick=deleteUser("${user._id}")>DeleteUser</button>
	<button onclick=editUser('${user.name}','${user.email}','${user._id}')>EditUser</button>
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

function editUser(name,email,id){
	document.getElementById('name').value=name;
	document.getElementById('email').value=email;
// 	const obj1={
// 		name,
// 		email
// 	}
// 	console.log(obj1);
// 	axios.put(`https://crudcrud.com/api/ab65b2c69e6c40b2a31dca2a40e76160/app/${id}`,obj1)
//   .then((response)=>{
//     getUserList(response);
//   })
//   .catch((err)=>{
//       console.log(err)
//     })



	deleteUser(id);
}

function deleteUser(userId){
	// console.log(userId);
	// localStorage.removeItem(email);
	axios.delete(`https://crudcrud.com/api/ab65b2c69e6c40b2a31dca2a40e76160/app/${userId}`)
  .then((res)=>{
    removeUserFromScreen(userId)
  })
  .catch((err)=>{
      console.log(err)
    })
	removeUserFromScreen(userId);
}

function removeSameUser(email){
    const parentNode=document.getElementById('userList');
    const childNodeToBeDeleted=document.getElementById(email);
	
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}


function removeUserFromScreen(userId){
	const parentNode=document.getElementById('userList');
	console.log(parentNode);
	const childNodeToBeDeleted=document.getElementById(userId);
	console.log(childNodeToBeDeleted);

	if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}