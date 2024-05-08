
import { useState, useEffect, useContext } from "react";
import logo from "../../logos/logo.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/UserContext";
import { useSelector } from "react-redux";



const Header = () => {


  //subscribe to cart store using useSelector hook which helps to identify which store we want to use selector gives us access to whole store and we just want to subscribe to small portion of store that is store.cart.items
  //this is how we read it 
  const cartItems = useSelector((store)=>store.cart.items)
  // console.log(cartItems)

  //to read from context use hook useContext and pass that particular context in it 
  const {loggedInUser} = useContext(userContext);
  // console.log(loggedInUser)

  const online = useOnlineStatus();
  const [click,setclick]=useState("Login")
// console.log("Header rendered")
    return (
      <div className="flex justify-between shadow-lg mb-2 bg-white">
        <div className="logo-container">
          <img src={logo} className="w-28 h-20" />
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4 items-center">
          <li className="px-4">{online?"🟢":"🔴"}</li>
            <li className="px-4"><Link to="/">Home</Link></li>
            <li className="px-4"><Link to="/about">About Us</Link></li>
            <li className="px-4"><Link to ="/contact">Contact Us</Link></li>
            <li className="px-4"><Link to ="/grocery">Grocery</Link></li>
            <li className="px-4 font-bold text-xl"><Link to="/cart"> Cart - {cartItems?.length} items</Link></li>
            <button className="login" onClick={()=>{click==="Login"?setclick("Logout"):setclick("Login")}}>{click}</button>
            <li className="font-bold pl-2">{loggedInUser}</li>
          </ul>
        </div>
      </div>
    );
  };
  export default Header;