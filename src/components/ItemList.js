import React from "react";
import { CDN_URL1 } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch()

  const handleAddItem=(item)=>{
    dispatch(addItem(item))
  }

  return (
    <div>
      {items.map((item) => (
        <div data-testid="foodItems"
          className="menu-res-container flex rounded-xl pb-5 mt-8 border-b-2"
          key={item.card.info.id}
        >
          <div className="flex flex-col ">
            <div className="font-semibold"> {item?.card?.info?.name}</div>
            <div>
              ₹
              {item?.card?.info?.price
                ? item?.card?.info?.price / 100
                : item?.card?.info?.defaultPrice / 100}
            </div>
            <div className="menu-disc  w-[800px] text-sm text-gray-400">
              {item?.card?.info?.description}
            </div>
          </div>
          <div className="menu-img ml-10">
            <div className="absolute">
              <button onClick={()=>handleAddItem(item)}
              data-testid="addbtn"
              className="bg-white shadow-lg font-bold h-8  text-green-600 border border-solid border-gray-300 rounded-md px-5  ml-4">
                ADD
              </button>
            </div>
            {item?.card?.info?.imageId ? (
              <>
                <img
                  src={CDN_URL1 + item?.card?.info?.imageId}
                  className="rounded-lg w-40 h-28"
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
