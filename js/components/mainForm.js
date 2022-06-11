
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
    xhttp.open("GET", "https://62a3ee1f259aba8e10dfb62b.mockapi.io/users");
    xhttp.send();
    console.log("jala");
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          // cambiar para nuestra api
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
  
          trHTML += '<td>'+object['name']+'</td>';
          trHTML += '<td><my-button-edit label="Edit" valueid='+object['id']+'></my-button-edit>';
          trHTML += '<my-button-del label="Del" valueid='+object['id']+'></my-button-del></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  export {loadTable};



  window.customElements.define("formulario-inicial", formularioInicial);
  