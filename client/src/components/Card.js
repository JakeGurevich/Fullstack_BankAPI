import "./card.css";
import AccountCard from "./AccountCard";
import React, { useState, useEffect } from "react";

const Card = (props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="cardWrap">
      <div className="card">
        <h5>User name :{props.n.name}</h5>
        <p>email : {props.n.email}</p>
        <p>phone : {props.n.phone}</p>
        <p>User ID : {props.n._id}</p>
      </div>
      {show && <AccountCard id={props.n._id} />}
      <button onClick={() => setShow(!show)}>Show account</button>
    </div>
  );
};
export default Card;
