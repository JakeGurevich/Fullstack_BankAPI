import "./card.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const AccountCard = (props) => {
  const [account, setAccount] = useState({});
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getAccount();
    // getCart();
  }, [update]);
  const getAccount = async () => {
    const id = props.id;
    let res = await axios.get(`http://localhost:5000/api/users/account/${id}`);
    console.log(res.data);
    setAccount(res.data);
  };
  const addCredit = async () => {
    console.log(cash);
    const id = props.id;
    let res = await axios.patch(
      `http://localhost:5000/api/users/update/${id}`,
      {
        credit,
      }
    );

    console.log(res.data);
    setCredit(res.data.credit);
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
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
          ></input>
          <button onClick={() => addCredit()}>Add Credit</button>
          <span>{credit}</span>
        </div>
      </div>

      {/* <button onClick={}>Account Info</button> */}
    </>
  );
};
export default AccountCard;
