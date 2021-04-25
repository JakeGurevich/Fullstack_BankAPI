import React from "react";
import { Link } from "react-router-dom";
import img from "./cart2.png";
import logo from "../img/logo.png";

const Header = (props) => {
  const update = "";
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="nav">
        <div className="link">
          <Link to="/">All products</Link>
        </div>
        <div className="cart">
          <Link
            to={{
              pathname: "/cart",
              data: {
                update: "true",
              },
            }}
          >
            <img src={img} alt="img" />
          </Link>

          <div className="cartUpdate">{props.inCart}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
