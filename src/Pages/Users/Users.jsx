import React from "react";
import List from "../../components/Tabla/Lista/Lista";
import "./Users.css";

class Users extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Headers: ['ID', 'Name', 'Rol'],
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

  render() {
    const filteredUsers = this.state.users.filter(user => 
      user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )

    return (
      <div className="container-modules">
        <div className="actions-inventory">
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
          openmodalupdate={this.openModal} 
          remove={this.removeUser}
          items={filteredUsers} 
          headers={this.state.Headers} 
        />
      </div>
    );
  }
}

export default Users;