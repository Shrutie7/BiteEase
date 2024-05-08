import React from "react";

import { useState } from "react";
import { clearCart,addItem,removeItem, removeItemByIndex } from "../utils/CartSlice";

import { useDispatch, useSelector } from "react-redux";
import { computeHeadingLevel } from "@testing-library/react";

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const [itemscart,setitemscart] = useState({});

  

  const plushandler = (ind,d) =>{
    console.log(d,ind);
  const jsond = {...itemscart};
  if(jsond[d.card.info.id]){
    jsond[d.card.info.id] += 1;
  }else{
    jsond[d.card.info.id] = 1;
  }
 
  console.log(jsond);

  setitemscart({...jsond})
  }
  const minushandler = (ind,d) =>{
    console.log(d,ind);
  const jsond = {...itemscart};
  if(jsond[d.card.info.id]){
    jsond[d.card.info.id] -= 1;
  }else{
    jsond[d.card.info.id] = 0;
  }
 
  console.log(jsond);

  setitemscart({...jsond})
  }

  const handleclearCart=()=>{
    dispatch(clearCart())
  }

  return (
    <div className="flex justify-center items-center">
      <div className="text-center bg-slate-100 rounded-2xl h-full w-[500px]  ">
        <h1 className="text-2xl font-semibold border-b-2  border-gray-400">Cart</h1>

        <div className="pt-6">
        {cartItems?.length>0?
          cartItems?.map((d,ind) => (
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
                {/* {(d?.card?.info?.price && clickbuttoncount === ind)
                  ? (d?.card?.info?.price / 100) * (cartarr.length+1)
                  : (d?.card?.info?.price/100) * 1} */}
              </div>
              <div className="absolute right-4 h-7 mt-2 w-16 text-center leading-10 border border-solid border-black flex">
                <div
                  className="w-7 h-4 text-center leading-5 cursor-pointer select-none"
                  onClick={()=>{itemscart[d?.card?.info?.id]!==0 ? minushandler(ind,d):dispatch(removeItemByIndex(ind))}}
                >
                  -
                </div>
                <div className="w-7 h-4 text-center leading-5 select-none">
                
                {/* {console.log(cartItems?.indexOf(d) === ind,cartarr)} */}
                  {/* {clickbuttoncount === ind ?cartarr.length+1:1} */}
                  {itemscart[d?.card?.info?.id]?itemscart[d?.card?.info?.id]+1:1}
                </div>
                <div
                  className="w-7 h-4 text-center leading-5 cursor-pointer select-none"
                  onClick={() => plushandler(ind,d)}
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
