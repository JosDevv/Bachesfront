
//import CreateApi from "./create"
class formularioInicial extends HTMLElement {
    constructor() {
      super();
      
    }
  
    connectedCallback() {
      loadTable();
    }
  }
  

   function loadTable() {
    const xhttp = new XMLHttpRequest();
    //cambiar para nuestra api
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/");
    xhttp.send();
    console.log("jala");
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects.results) {
          // cambiar para nuestra api
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['name']+'</td>';
  
          trHTML += '<td>'+object['url']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }



  function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/users/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
  }
  
  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/users/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['user'];
        console.log(user);
        Swal.fire({
          title: 'Edit User',
          html:
            '<input id="id" class="swal2-input" placeholder="First" value="'+user['id']+'" disabled>' +
            '<input id="fname" class="swal2-input" placeholder="First" value="'+user['fname']+'">' +
            '<input id="lname" class="swal2-input" placeholder="Last" value="'+user['lname']+'">' +
            '<input id="username" class="swal2-input" placeholder="Username" value="'+user['username']+'">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">' +
            '<input id="avatar" class="swal2-input" placeholder="Avatar" value="'+user['avatar']+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
  }
  
  function userEdit() {
    const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const avatar = document.getElementById("avatar").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/users/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "fname": fname, "lname": lname, "username": username, "email": email, 
      "avatar": avatar
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }
  
  window.customElements.define("formulario-inicial", formularioInicial);
  