import React, { useState, useEffect } from "react";

const Admin = (props) => {
  const [name, setName] = useState("Phone");
  const [price, setPrice] = useState("200");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  return (
    <>
      <div className="admin">
        {console.log(props)}
        <span>Admin Panel</span>
      </div>
      <label>Category</label>
      <input type="text" onChange={(e) => setCategory(e.target.value)}></input>
      <label>Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)}></input>

      <label>Price</label>
      <input type="text" onChange={(e) => setPrice(e.target.value)}></input>
      <label>Img</label>
      <input type="text" onChange={(e) => setImg(e.target.value)}></input>
      <button onClick={() => props.add({ category, name, price, img })}>
        Add product
      </button>
      <button onClick={() => props.delete()}>Delete product</button>
      <div>
        <button onClick={() => props.back(false)}>Back to products</button>
      </div>
    </>
  );
};
export default Admin;
