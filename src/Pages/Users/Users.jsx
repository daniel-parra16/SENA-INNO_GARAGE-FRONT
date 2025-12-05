import React from "react";
import List from "../../components/Tabla/Lista/Lista";
import "./Users.css";
import NewProductPanel from "../../components/Tabla/NewRegisterPanel/NewRegisterPanel";

class Users extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Headers: ['Name', 'Rol'],
      fields: [
        { name: "userName", label: "User Name", type: "text", edit: "name", placeholder: "Enter the user name" },
        { name: "userRol", label: "User Rol", type: "select", edit: "rol", placeholder: "Enter the user's rol" }
      ],
      roles: [
        {id: 1, name: "admin"},
        {id: 2, name: "client"},
        {id: 3, name: "mechanic"},
      ],
      users: [
        { id: 1, name: "Juan", rol: "admin" },
        { id: 2, name: "Diego", rol: "admin" },
        { id: 3, name: "Daniel", rol: "admin" },
      ],
      searchTerm: "",
      newUserPanel: false,
      editingUser: null,
    }
  }

  openModal = () => {
    this.setState({
      newUserPanel: true,
      editingUser: null
    });
  }

  openModalToEdit = (user) => {
    this.setState({
      newUserPanel: true,
      editingUser: user
    })
  }

  onCancel = () => {
    this.setState({
      newUserPanel: false
    });
  }

  onAdd = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.userName.value || !form.userRol.value) {
      alert("Please fill out all the fields.")
      return;
    }
    const newUser = {
      id: this.state.users.length + 1,
      name: form.userName.value,
      rol: form.userRol.value,
    };

    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
      newUserPanel: false,
    }));
  }

  onUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedUser = {
      ...this.state.editingUser,
      name: form.userName.value,
      rol: form.userRol.value
    };

    this.setState(prevState => ({
      users: prevState.users.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      ),
      newUserPanel: false,
      editingUser: false
    }))
  }

  removeUser = (e) => {
    const button = e.target;
    const row = button.closest('tr');
    const userId = parseInt(row.cells[0].textContent, 10);
    this.setState((prevState) => ({
      users: prevState.users.filter(user => user.id !== userId),
    }))
  }

  render() {
    const filteredUsers = this.state.users.filter(user => 
      user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )

    return (
      <div className="container-modules">
        <h1>Users</h1>
        <div className="actions-modules">
          <button onClick={this.openModal} className="btn-create">Create User</button>

          <input 
            type="text" 
            placeholder="Search User" 
            value={this.state.searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value})}
            className='table-search'
          />
        </div>
        <List 
          openmodalupdate={this.openModalToEdit} 
          remove={this.removeUser}
          items={filteredUsers} 
          headers={this.state.Headers} 
        />
        {
          (this.state.newUserPanel)
          ? <NewProductPanel
              onadd={this.onAdd}
              onupdate={this.onUpdate}
              oncancel={this.onCancel}
              record={this.state.editingUser}
              module="User"
              fields={this.state.fields}
              roles={this.state.roles}
            />
          : ""
        }
      </div>
    );
  }
}

export default Users;