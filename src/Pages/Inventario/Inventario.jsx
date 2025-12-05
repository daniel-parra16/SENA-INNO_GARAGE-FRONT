import React from 'react';
import List from '../../components/Tabla/Lista/Lista';
import NewProductPanel from '../../components/Tabla/NewRegisterPanel/NewRegisterPanel';
import './Inventario.css';

class Inventario extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      headers: ["name", "stock"],
      fields: [
        {name: "productName", label: "Product Name", type: "text", edit: "name", placeholder: "Enter the product name"},
        {name: 'productQuantity', label: "Product Quantity", type: "number", edit: "stock", placeholder: "Enter the product price" }
      ],
      products: [
        { id: 1, name: 'Producto A', stock: 10 },
        { id: 2, name: 'Producto B', stock: 5 },
        { id: 3, name: 'Producto C', stock: 8 },
      ],
      searchTerm: '',
      newProductPanel: false,
      editingProduct: null,
    };
  }

  openModal = () => {
    this.setState({
      newProductPanel: true,
      editingProduct: null
    });
  }

  openModalToEdit = (product) => {
    this.setState({
      editingProduct: product,
      newProductPanel: true
    });
  }

  onCancel = () => {
    this.setState({ newProductPanel: false });
  }

  onAdd = (e) => {
    console.log(e.target);
    e.preventDefault();
    const form = e.target; 
    //valida q ningun dato este vacio
    if (!form.productName.value || !form.productQuantity.value) {
      alert("Please fill out all the fields.");
      return;
    }
    const newProduct = {
      id: this.state.products.length + 1,
      name: form.productName.value,
      stock: parseInt(form.productQuantity.value, 10),
    };

    this.setState((prevState) => ({
      products: [...prevState.products, newProduct],
      newProductPanel: false,
    }));
  }

  //update
  onUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
      ...this.state.editingProduct,
      name: form.productName.value,
      stock: parseInt(form.productQuantity.value)
    };

    this.setState(prevState => ({
      products: prevState.products.map(p =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
      newProductPanel: false,
      editingProduct: null
    }));
  };

  removeProduct = (e) => {
    const button = e.target;
    const row = button.closest('tr');
    const productId = parseInt(row.cells[0].textContent, 10);
    this.setState((prevState) => ({
      products: prevState.products.filter(product => product.id !== productId),
    }));
  }

  render() {
    const filteredProducts = this.state.products.filter(product =>
      product.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <div className="container-modules">
        <div className="actions-inventory">
          <button onClick={this.openModal} className="btn-create">Create Product</button>

          <input
            type="text"
            placeholder="Search product"
            value={this.state.searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            className='table-search'
          />
        </div>
        <List 
          openmodalupdate={this.openModalToEdit} 
          remove={this.removeProduct} 
          items={filteredProducts} 
          headers={this.state.headers} />
        {
          (this.state.newProductPanel) 
            ? <NewProductPanel
                onadd={this.onAdd}
                onupdate={this.onUpdate}
                oncancel={this.onCancel}
                record={this.state.editingProduct}
                module="Product"
                fields={this.state.fields}
              /> 
            : null 
        }
      </div>
    );
  }
}

export default Inventario;