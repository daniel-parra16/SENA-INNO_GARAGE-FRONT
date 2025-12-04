import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        {this.props.headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>ACCIONES</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.items.map((item) => (
                        <tr key={item.id}>
                            <td key={item.id}>{String(item.id).padStart(6,'0')}</td>
                            {this.props.headers.map((header, index) => {
                                let value = item[header.toLowerCase()];
                                return <td key={index}>{value}</td>;
                            })}
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