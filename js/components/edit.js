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
    xhttp.open("GET", "https://62a3ee1f259aba8e10dfb62b.mockapi.io/users/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects;
        console.log(user);
        Swal.fire({
          title: 'Edit User',
          html:
            '<input id="id" class="swal2-input" placeholder="First" value="'+user['id']+'" disabled>' +
            '<input id="name" class="swal2-input" placeholder="First" value="'+user['name']+'">',
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
    const name = document.getElementById("name").value;

      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://62a3ee1f259aba8e10dfb62b.mockapi.io/users/"+id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "name": name
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //const objects = JSON.parse(this.responseText);
        console.log("editado");
        //Swal.fire(objects['message']);
        
        loadTable();
      }
    };
  }
  
  
