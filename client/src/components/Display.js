import React, { useState, useEffect } from "react";
import api from "../api/api";

import axios from "axios";
import Card from "./Card";
import User from "./User.component";

const Display = () => {
  const [products, setProducts] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    getProducts();
    // getCart();
  }, []);
  const getProducts = async () => {
    let res = await api.get("/users");
    console.log(res.data);
    setProducts(res.data);
  };

  const displayCards =
    products &&
    products.map((p) => {
      return <Card key={p._id} n={p} />;
    });

  return (
    <div className="App">
      Users:
      {showAdmin ? <div className="wrap"> {displayCards}</div> : <User />}
      <button
        onClick={() => {
          setShowAdmin(!showAdmin);
        }}
      >
        Add User
      </button>
    </div>
  );
};

export default Display;
