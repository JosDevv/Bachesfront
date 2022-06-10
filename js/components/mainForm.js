class formularioInicial extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <button>create</button>
      <table BORDER>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">NOMBRE</th>
        <th scope="col">CAMPO 1</th>
        <th scope="col">CAMPO 2</th>
        <th></th>
      </tr>
    <tr>
    <td scope="col">1</th>
    <td scope="col">ejemplo</th>
    <td scope="col">campo 1</th>
    <td scope="col">campo 2</th>
    <th scope="col"><button>edit</button>|<button>del</button></th>
    </tr>
    </table>
      `;
    }
  }
  
  window.customElements.define("formulario-inicial", formularioInicial);
  