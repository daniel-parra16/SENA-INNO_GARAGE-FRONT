import React from "react";
import "./Ordenes.css";
import List from "../../components/Tabla/Lista/Lista";
import NewRegisterPanel from "../../components/Tabla/NewRegisterPanel/NewRegisterPanel";

  class orders extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        headers: ["identificacion", "cliente", "vehicle", "process", "quote", "deliveryDate", "asignedTo", "status"],
        fields: [
          {name: "identificacion", label: "Identificación", type: "number", edit: "identificacion", placeholder: "Ingrese la identificación del cliente"},
          {name: "cliente", label: "Cliente", type: "text", edit: "cliente", placeholder: "Ingrese el nombre del cliente"},
          {name: "vehicle", label: "Vehículo", type: "text", edit: "vehicle", placeholder: "Ingrese el modelo del vehículo"},
          {name: "process", label: "Proceso", type: "text", edit: "process", placeholder: "Ingrese el proceso a realizar"},
          {name: "quote", label: "Cotización", type: "number", edit: "quote", placeholder: "Ingrese el valor de la cotización"},
          {name: "deliverydate", label: "Fecha de Entrega", type: "datetime-local", edit: "deliverydate", placeholder: "Ingrese la fecha de entrega"},
          {name: "asignedto", label: "Asignado a", type: "text", edit: "asignedto", placeholder: "Ingrese el nombre del encargado"},
          {name: "status", label: "Estado", type: "text", edit: "status", placeholder: "Ingrese el estado de la cotización"},
        ],
        orders: [
          { id: 1, identificacion: 1014990000, cliente: 'Daniel', vehicle: "Gixxer 250", process: ["Wash", "Oil Change"], quote: 20000, deliverydate: "2024-07-20 12:00:00", asignedto: "Juan Perez", status: "In Process" },
          { id: 2, identificacion: 1023456789, cliente: 'Maria', vehicle: "Yamaha FZ", process: ["Tire Change"], quote: 15000, deliverydate: "2024-07-22 15:30:00", asignedto: "Ana Gomez", status: "Pending" },
          { id: 3, identificacion: 1034567890, cliente: 'Carlos', vehicle: "Honda CB", process: ["Engine Check", "Brake Replacement"], quote: 30000, deliverydate: "2024-07-25 10:00:00", asignedto: "Luis Martinez", status: "Completed" },
          { id: 4, identificacion: 1045678901, cliente: 'Laura', vehicle: "Ducati Monster", process: ["Full Service"], quote: 50000, deliverydate: "2024-07-28 09:00:00", asignedto: "Sofia Lopez", status: "In Process" },
        ],
        searchTerm: '',
        neworderPanel: false,
        editingorder: null,
      };
    }

    openModal = () => {
      this.setState({
        neworderPanel: true,
        editingorder: null
      });
    }

    openModalToEdit = (order) => {
      this.setState({
        editingorder: order,
        neworderPanel: true
      });
    }

    onCancel = () => {
      this.setState({ neworderPanel: false });
    }

    onAdd = (e) => {
      e.preventDefault();
      const form = e.target;

      console.log(e.target);

      if (!form.identificacion.value || !form.cliente.value || !form.vehicle.value || !form.process.value || !form.quote.value || !form.deliverydate.value || !form.asignedto.value || !form.status.value) {
        alert("Please fill out all the fields.");
        return;
      }

      const neworder = {
        id: this.state.orders.length + 1,
        identificacion: parseInt(form.identificacion.value, 10),
        cliente: form.cliente.value,
        vehicle: form.vehicle.value,
        process: form.process.value.split(',').map(item => item.trim()),
        quote: parseInt(form.quote.value, 10),
        deliverydate: form.deliverydate.value,
        asignedto: form.asignedto.value,
        status: form.status.value,
      };

      this.setState((prevState) => ({
        orders: [...prevState.orders, neworder],
        neworderPanel: false,
      }));
    }

    onUpdate = (e) => {
      e.preventDefault();
      const form = e.target;
      const updatedorder = {
        ...this.state.editingorder,
        identificacion: parseInt(form.identificacion.value, 10),
        cliente: form.cliente.value,
        vehicle: form.vehicle.value,
        process: form.process.value.split(',').map(item => item.trim()),
        quote: parseInt(form.quote.value, 10),
        deliverydate: form.deliverydate.value,
        asignedto: form.asignedto.value,
        status: form.status.value,
      };
      this.setState(prevState => ({
        orders: prevState.orders.map(c =>
          c.id === updatedorder.id ? updatedorder : c
        ),
        neworderPanel: false,
      }));
    }

    removeorder = (e) => {
      const button = e.target;
      const row = button.closest('tr');
      const cotizationId = parseInt(row.cells[0].textContent, 10);
      this.setState(prevState => ({
        orders: prevState.orders.filter(c => c.id !== cotizationId)
      }));
    }

    render() {

      const finteredorders = this.state.orders.filter(order => 
        order.cliente.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        order.vehicle.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        order.asignedTo.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );

    return (
      <div className="container-modules">
        <h1>Ordenes</h1>
        <div className="actions-modules">
          <button onClick={this.openModal} className="btn-create">Create Order</button>

          <input
            type="text"
            placeholder="Search Order"
            value={this.state.searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            className="table-search"
          />
        </div>
        <List
          headers={this.state.headers}
          items={finteredorders}
          openmodalupdate={this.openModalToEdit}
          remove={this.removeorder}
        />
        { this.state.neworderPanel && (
          <NewRegisterPanel
            fields={this.state.fields}
            oncancel={this.onCancel}
            onadd={this.onAdd}
            onupdate={this.onUpdate}
            record={this.state.editingorder}
            module="Order"
          />
        )}
      </div>
    );
  }
}

export default orders;