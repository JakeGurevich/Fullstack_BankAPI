import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

const api = axios.create({
  baseURL: `https://605b25cf27f0050017c06492.mockapi.io`,
});

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null);

  let itemsInCart = 0;
  //   const { update } = props.location.state;
  console.log(props);
  useEffect(() => {
    getCartItems();
  }, [deletedItem]);
  const getCartItems = async () => {
    let res = await api.get("/cart");
    console.log(res.data);
    setCartItems(res.data);
  };
  const deleteItem = async (item) => {
    let res = await api.delete(`/cart/${item.id}`);
    console.log(res.data);

    setDeletedItem(res.data);
    // update(res.data);
    console.log(deletedItem);
  };
  const checkSum = () => {
    let sum = 0;

    cartItems.map((item) => {
      console.log(item.price);
      sum = sum + Number(item.price) * item.quantity;
      console.log(sum);
    });
    return sum;
  };
  const updateCart = async (param, item) => {
    let updateID = `/cart/${item.id}`;
    if (param === "more") {
      let res = await api.put(updateID, { quantity: item.quantity + 1 });
    } else {
      let res = await api.put(updateID, { quantity: item.quantity - 1 });
      console.log(res.data);
    }
    setDeletedItem(item);
  };
  const displayCards =
    cartItems &&
    cartItems.map((p) => {
      itemsInCart = itemsInCart + p.quantity;

      return (
        <Card
          key={p.id}
          n={p}
          style="cart"
          delete={deleteItem}
          update={updateCart}
        />
      );
    });

  return (
    <>
      <div className="cartContainer">
        <div className="cartItemsContainer">
          Cart <span>({itemsInCart})</span>
          {displayCards}
        </div>
        <div className="total">
          <span>Total : {checkSum()}$</span>
          <button>Proceed to checkout</button>
        </div>
        <div className="btn">
          <Link to="/">Back to Products</Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
