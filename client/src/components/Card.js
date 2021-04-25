import React, { useState, useEffect } from "react";
import "./card.css";
import img from "../img/delete.png";
import up from "../img/up.png";
import down from "../img/down.png";
import AccountCard from "./AccountCard";
const Card = (props) => {
  const [showAccount, setShowAccount] = useState(false);
  return (
    <div className="cardWrap">
      <div className={props.cssClass ? props.cssClass : "card"}>
        <h5>Name : {props.n.name}</h5>
        <p>Email : {props.n.email}</p>
        <p>Phone : {props.n.phone}</p>
        <p>Id : {props.n._id}</p>
      </div>
      {showAccount && <AccountCard id={props.n._id} />}

      <button onClick={() => setShowAccount(!showAccount)}>Show Account</button>
    </div>
  );
};
export default Card;
