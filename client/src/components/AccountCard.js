import "./card.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../api/api";

const AccountCard = (props) => {
  const [account, setAccount] = useState({});
  const [cash, setCash] = useState();
  const [credit, setCredit] = useState(0);
  const [amount, setAmount] = useState(0);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getAccount();
    // getCart();
  }, [update]);
  const getAccount = async () => {
    const id = props.id;
    let res = await api.get(`/users/account/${id}`);
    console.log(res.data);
    setAccount(res.data);
  };
  const addCredit = async () => {
    console.log(cash);
    const id = props.id;
    let res = await api.patch(`/users/update/${id}`, {
      credit: amount,
    });

    console.log(res.data);
    // setCredit(res.data.credit);
    setUpdate(!update);
  };
  const addCash = async () => {
    console.log(cash);
    const id = props.id;
    let res = await api.patch(`/users/update/${id}`, {
      cash: amount,
    });

    console.log(res.data);
    // setCredit(res.data.credit);
    setUpdate(!update);
  };

  return (
    <>
      <div className="accountcard">
        <h5>Account ID :{account._id} </h5>
        <p>User ID :{account.user_id} </p>
        <p>Cash :{account.cash} </p>
        <p>Credit :{account.credit}</p>
        <div className="admin">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
          <button onClick={() => addCredit()}>Add Credit</button>
          <button onClick={() => addCash()}>Add Cash</button>
        </div>
      </div>

      {/* <button onClick={}>Account Info</button> */}
    </>
  );
};
export default AccountCard;
