import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className="inventario-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.items.map((item) => (
                        <tr key={item.id}>
                            <td>{String(item.id).padStart(6, '0')}</td>
                            <td>{item.name}</td>
                            <td>{item.stock}</td>
                            <td className="actions-cell">
                                <button className="btn-edit">Editar</button>
                                <button className="btn-delete">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
export default List;