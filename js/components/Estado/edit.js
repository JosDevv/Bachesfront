const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
        
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 65px;
      height: 30px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #5CA4EC;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`;

class ButtonEdit extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
        showUserEditBox(this.valueid);
        
        
    });
  }
  get label() {
    return this.getAttribute('label');
  }
  get valueid(){
    return this.getAttribute('valueid');
  }
  set valueid(value){
    this.setAttribute('valueid', value);    
  }
  set label(value) {
    this.setAttribute('label', value);
  }
  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }
  render() {
    this.$button.innerHTML = this.label;
  }
}

window.customElements.define('my-button-edit', ButtonEdit);
// modificar para nuestra api con respecto a los campos a enviar
import {loadTable} from './mainForm.js';
  
  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/bachestpi2022/resources/estado/findId?id="+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects[0];
        console.log(user);
        Swal.fire({
          title: 'Edit User',
          html:
          '<input id="nombre" value="'+user['nombre']+'" class="swal2-input" placeholder="true">' +
          '<input id="fechaCreacion" value="'+user['fechaCreacion']+'" class="swal2-input" placeholder="01061999">' +
          '<input id="observaciones" value="'+user['observaciones']+'" class="swal2-input" placeholder="ya no esta">' ,
          focusConfirm: false,
          preConfirm: () => {
            userEdit(id);
          }
        })
      }
    };
  }
  
  function userEdit(id) {

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fechaCreacion").value;
    const observaciones = document.getElementById("observaciones").value;

      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/bachestpi2022/resources/estado");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
     "idEstado":id,"nombre":nombre, "fechaCreacion":fecha, "observaciones":observaciones
    }));
    xhttp.onreadystatechange = function() {
      if ((this.status >= 200 && this.status<300) ){
        //const objects = JSON.parse(this.responseText);
        console.log("editado");
        //Swal.fire(objects['message']);
        
        loadTable();
      }else{
        Swal.fire("A ocurrido un error los cambios no se guardaron");
      }
    };
  }
  
  
