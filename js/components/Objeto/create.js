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

      width: 100%;
      height: 40px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #5CEC6D;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      showUserCreateBox();
    });
  }
  get label() {
    return this.getAttribute('label');
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

window.customElements.define('my-button', Button);
// modificar para nuestra api con respecto a los campos a enviar
import {loadTable} from './mainForm.js';
  function showUserCreateBox() {
    Swal.fire({
      title: 'Create user',
      html:
        
        
        '<input id="idTipoObjeto" class="swal2-input" placeholder="1,2,3">' +
        '<input id="longitud" class="swal2-input" placeholder="90.123132">' +
        '<input id="latitud" class="swal2-input" placeholder="50.123132">' +
        '<input id="nombre" class="swal2-input" placeholder="nombre">' +
        '<input id="observaciones" class="swal2-input" placeholder="ya no esta">' ,
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  function userCreate() {
    
    
    const idTipoObjeto = document.getElementById("idTipoObjeto").value;
    const latitud = document.getElementById("latitud").value;
    const longitud = document.getElementById("longitud").value;
    const nombre = document.getElementById("nombre").value;
    const observaciones = document.getElementById("observaciones").value;

      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/bachestpi2022/resources/objeto");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
     "idTipoObjeto":{"idTipoObjeto":idTipoObjeto}, "latitud":latitud, "longitud":longitud,"nombre":nombre, "observaciones":observaciones
    }));
    
    xhttp.onreadystatechange = function() {
      console.log("hasta aca todo bien");
      
        
        console.log("agregado");
        Swal.fire("agregado ");
        loadTable();
      
    };
  }
  
  
  
