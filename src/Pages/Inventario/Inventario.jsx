import React from 'react';
import List from '../../components/Inventario/Lista/Lista';
import NewProductPanel from '../../components/Inventario/NewProductPanel/NewProductPanel';
import './Inventario.css';

class Inventario extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
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
    e.preventDefault();
    const form = e.target; 
    //valida q ningun dato este vacio
    if (!form.productName.value || !form.productQuantity.value) {
      alert("Por favor, complete todos los campos.");
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
    console.log("Producto agregado:", newProduct);
  }

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

    console.log("Producto actualizado:", updatedProduct);
  };


  removeProduct = (e) => {
    const button = e.target;
    const row = button.closest('tr');
    const productId = parseInt(row.cells[0].textContent, 10);
    this.setState((prevState) => ({
      products: prevState.products.filter(product => product.id !== productId),
    }));
    console.log("Producto eliminado con ID:", productId);
  }

  render() {
    const filteredProducts = this.state.products.filter(product =>
      product.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <div className="table">
        <div className="actions-inventory">
          <button onClick={this.openModal} className="btn-create">Crear Producto</button>

          <input
            type="text"
            placeholder="Buscar producto"
            value={this.state.searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            className='inventory-search'
          />
        </div>
        <List openmodalupdate={this.openModalToEdit} remove={this.removeProduct} items={filteredProducts}/>
        {
          (this.state.newProductPanel) 
            ? <NewProductPanel
                onadd={this.onAdd}
                onupdate={this.onUpdate}
                oncancel={this.onCancel}
                product={this.state.editingProduct}
              /> 
            : null 
        }
      </div>
    );
  }
}

export default Inventario;