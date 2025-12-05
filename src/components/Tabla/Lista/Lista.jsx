import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-wrapper">
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
                                    if (header.toLowerCase() === "process" && Array.isArray(value)) {
                                        value = (
                                            <ul className='table-process'>
                                                {value.map((v, i) => (
                                                    <li key={i}>{v}</li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                    return <td key={index}>{value}</td>;
                                })}
                                <td className="actions-cell">
                                    <div className="actions-wrapper">
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default List;