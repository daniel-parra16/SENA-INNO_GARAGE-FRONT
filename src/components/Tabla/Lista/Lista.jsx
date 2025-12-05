import React from 'react';
import DeliveryDate from '../../modal/DeliveryDate';
import { FaTrash, FaEdit, FaPaperPlane } from "react-icons/fa";

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryModal: false,
        };
    }

    openModalOrder = () => {
        console.log("Sending order...");
        this.setState({ deliveryModal: true });
    }

    sendOrder = (e) => {
        const button = e.target;
        const row = button.closest('tr');
        const cotizationId = parseInt(row.cells[0].textContent, 10);
        const cotizacion = this.props.items.find(c => c.id === cotizationId);
        if (cotizacion) {
            alert(`Order sent for Cotización ID: ${cotizationId}, Cliente: ${cotizacion.cliente}`);
        }
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

                                        {(this.props.module === "Cotización") && (
                                            <button
                                                onClick={this.openModalOrder}
                                                className="btn-icon send"
                                            >
                                                <FaPaperPlane />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(this.state.deliveryModal) ? (
                    <DeliveryDate
                        onsubmit={this.props.send}
                        oncancel={() => this.setState({ deliveryModal: false })}
                        fields={[
                            {
                                label: "Delivery Date",
                                type: "datetime-local",
                                name: "deliverydate",
                            },
                            {
                                label: "Asigned To",
                                type: "select",
                                name: "asignedto",
                            }
                        ]}
                        mechanics={[
                            { id: 1,name: "Mechanic 1" },
                            { id: 2,name: "Mechanic 2" },
                            { id: 3,name: "Mechanic 3" },
                        ]}
                    />
                ) : ""}
            </div>
        );
    }
}
export default List;