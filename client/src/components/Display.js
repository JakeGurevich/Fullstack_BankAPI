import React, { useState, useEffect } from "react";

import axios from "axios";
import Card from "./Card";

const Display = () => {
  const [products, setProducts] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [newProducts, setNewProduct] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getProducts();
    // getCart();
  }, [newProducts, deletedProducts, addedToCart]);
  const getProducts = async () => {
    let res = await axios.get("http://localhost:5000/api/users");
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
      <div className="wrap"> {displayCards}</div>
    </div>
  );
};

export default Display;
