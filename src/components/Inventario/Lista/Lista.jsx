import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";

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
                                <button
                                    onClick={() => this.props.openmodalupdate(item)}
                                    className="btn-icon edit"
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    onClick={this.props.remove}
                                    className="btn-icon delete"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
export default List;