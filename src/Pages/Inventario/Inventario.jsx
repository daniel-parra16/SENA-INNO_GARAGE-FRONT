import React from 'react';
import List from '../../components/Header/Inventario/Lista';
import NewProductPanel from '../../components/Header/Inventario/NewProductPanel';
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
    };
  }

  addProduct = () => {
    this.setState({ newProductPanel: true });
    console.log("Abrir panel para crear nuevo producto");
  }

  render() {
    const filteredProducts = this.state.products.filter(product =>
      product.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <div className="table">
        <div className="actions">
          <button onClick={this.addProduct} className="btn-create">Crear Producto</button>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={this.state.searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            className='search-box'
          />
        </div>
        <List items={filteredProducts}/>
        <NewProductPanel />
      </div>
    );
  }
}

export default Inventario;