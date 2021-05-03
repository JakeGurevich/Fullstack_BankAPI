import "./card.css";

import React, { useState, useEffect } from "react";
import api from "../api/api";

const User = (props) => {
  const [name, setName] = useState("");
  const [passportId, setPassportId] = useState("");
  const [email, setEmail] = useState("");
  let _id = passportId;
  const addUser = async (user) => {
    console.log(user);
    const createdUser = await api.post("/users", user);
  };

  return (
    <div>
      <div>Create User</div>
      <label>Name</label>
      <input
        onChange={(e) => setName(e.target.value)}
        name="name"
        value={name}
        type="text"
      />
      <label>Passport Id</label>
      <input
        onChange={(e) => setPassportId(e.target.value)}
        name="passportId"
        value={passportId}
        type="text"
      />
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        value={email}
        type="text"
      />
      <button onClick={() => addUser({ name, _id, email })}>submit</button>
      {/* <div onClick={this.handleFindAll}>Find all users</div>
        <div onClick={this.handleFindOne}>Find one user</div>
        <div onClick={this.handleDeleteAll}>Delete all users</div>
        <div onClick={this.handleDeleteOne}>Delete One users</div> */}
    </div>
  );
};
export default User;
