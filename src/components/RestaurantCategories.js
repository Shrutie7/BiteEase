import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";

// if we want to open 1 accordian and all other accordian should close then we need to lift state up i.e make this component as controlled component i.e from restaurantMenu component send props as showItems and on basis of that show and collapse

const RestaurantCategories = ({ data, showItems, setshowIndex }) => {
  const [showItems1, setshowItems1] = useState(false);
  console.log(data);
  const handleClick = () => {
    //   //initially all accordian is collapsed
    //   //to build toggle like click if showItems is true make it false if showItems is false make it true
    setshowItems1(!showItems1);
  };

  // use this if one accordian is open others need to collapse

  const handleClickshow = () => {
    console.log(showItems);

    setshowIndex();
  };
  // show and hide data on data layer itemList is on UI layer
  return (
    <div>
      {/* header section of accordian */}
      <div className="menu-con-top  gap-x-4  w-[950px] ml-72 mt-10">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => handleClick()}
          // onClick={() => handleClickshow()}
        >
          <span className="font-bold text-lg">
            {data?.title}({data?.itemCards.length})
          </span>
          <span className="cursor-pointer">{showItems ? "∨" : "∧"}</span>
        </div>
        {/* accordian body */}

        {showItems1 ? (
          <ItemList items={data?.itemCards} />
        ) : (
          <div className="bg-gray-100 h-4"></div>
        )}
        {/* {showItems ? (
          <ItemList items={data?.itemCards} />
        ) : (
          <div className="bg-gray-100 h-4"></div>
        )} */}
      </div>
    </div>
  );
};

export default RestaurantCategories;
