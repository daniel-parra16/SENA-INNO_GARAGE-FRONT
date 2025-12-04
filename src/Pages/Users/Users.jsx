import React from "react";
import "./Users.css";

class Users extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [
        { id: 1, name: "Juan", rol: "admin" },
        { id: 2, name: "Diego", rol: "admin" },
        { id: 3, name: "Daniel", rol: "admin" },
      ]
    }
  }

  render() {
    return (
      <div className="users-page">
        <h1>Users</h1>
        <p>Gestión de usuarios.</p>
      </div>
    );
  }
}

export default Users;