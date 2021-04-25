import React, { useState, useEffect } from "react";

import axios from "axios";
import Card from "./Card";
import DisplayItem from "./DisplayItem";
import Admin from "./Admin";
import Header from "./Header";
import Cart from "./Cart";

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

  // const getCart = async () => {
  //   let res = await api.get("/cart");
  //   console.log(res.data);
  //   setCartItems(res.data);
  //   checkSum();
  // };
  // const deleteProduct = async () => {
  //   const last = products[products.length - 1];
  //   console.log(last.id);
  //   let res = await api.delete(`/items/${last.id}`);
  //   console.log(res.data);
  //   console.log(newProducts);
  //   setDeletedProducts([...deletedProducts, res.data]);
  //   console.log(deletedProducts);
  // };
  // const addToCart = async (p) => {
  //   p.quantity = 1;

  //   const isInCart = cartItems.find((item) => {
  //     return item.name === p.name ? true : false;
  //   });

  //   console.log(isInCart);
  //   if (!isInCart) {
  //     let res = await api.post("/cart", p);
  //     console.log(res.data);
  //   } else {
  //     let updateID = `/cart/${isInCart.id}`;
  //     let res = await api.put(updateID, { quantity: isInCart.quantity + 1 });
  //     console.log(res.data);
  //   }

  //   setAddedToCart([...addedToCart, p]);
  // };
  // const checkSum = () => {
  //   let sum = 0;

  //   cartItems.map((item) => {
  //     console.log(item.quantity);
  //     sum += item.quantity;
  //     console.log(sum);
  //   });
  //   return sum;
  // };
  const displayCards =
    products &&
    products.map((p) => {
      return <Card key={p._id} n={p} />;
    });

  // const addProduct = async (p) => {
  //   console.log(p);

  //   const obj = {
  //     category: p.category,
  //     name: p.name,
  //     price: p.price,
  //     img: p.img,
  //   };
  //   let res = await api.post("/items", obj);
  //   console.log(res.data);
  //   setNewProduct([...newProducts, obj]);
  //   // getProducts();
  // };

  return showAdmin ? (
    <Admin
    // add={addProduct}
    // delete={deleteProduct}
    // list={deletedProducts}
    // back={setShowAdmin}
    />
  ) : (
    <div className="App">
      Users:
      <div className="wrap"> {displayCards}</div>
      <button onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "Back to products" : "Show Admin"}
      </button>
    </div>
  );
};

export default Display;
