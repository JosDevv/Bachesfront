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
        
        '<input id="idEstado" class="swal2-input" placeholder="1,2,3">' +
        '<input id="idObjeto" class="swal2-input" placeholder="1,2,3">' +
        '<input id="actual" class="swal2-input" placeholder="true">' +
        '<input id="fechaAlcanzado" class="swal2-input" placeholder="01061999">' +
        '<input id="observaciones" class="swal2-input" placeholder="ya no esta">' ,
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  function userCreate() {
    
    const idEstado = document.getElementById("idEstado").value;
    const idObjeto = document.getElementById("idObjeto").value;
    const actual = document.getElementById("actual").value;
    const fecha = document.getElementById("fechaAlcanzado").value;
    const observaciones = document.getElementById("observaciones").value;

      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/bachestpi2022/resources/objetoestado");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "idEstado": {"idEstado":idEstado}, "idObjeto":{"idObjeto":idObjeto}, "actual":actual, "fechaAlcanzado":fecha, "observaciones":observaciones
    }));
    
    xhttp.onreadystatechange = function() {
     
      if (this.readyState==4 && (this.status >= 200 && this.status<300) ){
        
        Swal.fire("agregado ");
        loadTable();
      }else{
          Swal.fire("Verifique si las dependencias de objeto y estado son validas o si inserto mal un dato");
      }
      
    };
  }
  
  
  
