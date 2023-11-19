import React from "react";

import { useState } from "react";
import { clearCart } from "../utils/CartSlice";

import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  let [count, setcount] = useState(1);

  const minushandler = () => {
    if (count > 0) {
      count = count - 1;
      setcount(count);
    } else {
      setcount(0);
    }
  };

  const plushandler = () => {
    count = count + 1;
    setcount(count);
  };

  const handleclearCart=()=>{
    dispatch(clearCart())
  }

  return (
    <div className="flex justify-center items-center">
      <div className="text-center bg-slate-100 rounded-2xl h-[640px] w-[500px]  ">
        <h1 className="text-2xl font-semibold border-b-2  border-gray-400">Cart</h1>

        <div className="pt-6">
        {cartItems?.length>0?
          cartItems?.map((d) => (
            <div className="flex gap-7 mt-4 relative ">
              {d?.card?.info?.imageId ? (
                <>
                  <img
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                      d?.card?.info?.imageId
                    }
                    className="rounded-lg w-16 h-14 ml-2"
                  />
                </>
              ) : (
                <></>
              )}
              <div className="font-medium text-sm text-center leading-10">
                {" "}
                {d?.card?.info?.name}
              </div>
              <div className="absolute right-32 font-medium text-sm text-center leading-10">
                ₹
                {d?.card?.info?.price
                  ? (d?.card?.info?.price / 100) * count
                  : (d?.card?.info?.defaultPrice / 100) * count}
              </div>
              <div className="absolute right-4 h-7 mt-2 w-16 text-center leading-10 border border-solid border-black flex">
                <div
                  className="w-7 h-4 text-center leading-5 cursor-pointer select-none"
                  onClick={()=>{count>1 ? minushandler():handleclearCart()}}
                >
                  -
                </div>
                <div className="w-7 h-4 text-center leading-5 select-none">
                  {count}
                </div>
                <div
                  className="w-7 h-4 text-center leading-5 cursor-pointer select-none"
                  onClick={() => plushandler()}
                >
                  +
                </div>
              </div>
            </div>
          )):<div><img src={"https://hangry.io/img/cook.png"}/>
          <div className="font-semibold text-lg pt-5">Your cart is empty</div>
          <div className="font-light text-lg pt-3">You can go to home page to view more restaurants</div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
