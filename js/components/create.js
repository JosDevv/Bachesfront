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
        
        '<input id="name" class="swal2-input" placeholder="name">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  function userCreate() {
    
    const name = document.getElementById("name").value;

      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://62a3ee1f259aba8e10dfb62b.mockapi.io/users");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "name": name
    }));
    
    xhttp.onreadystatechange = function() {
      console.log("hasta aca todo bien");
      
        const objects = JSON.parse(this.responseText);
        console.log("agregado");
        Swal.fire("agregado : "+name);
        loadTable();
      
    };
  }
  
  
  
