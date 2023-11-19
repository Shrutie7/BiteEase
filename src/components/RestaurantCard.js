// import named exports with curly braces
import React from "react";
import { useContext } from "react";
import { CDN_URL } from "../utils/constant";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {loggedInUser}=useContext(UserContext)

  const { name, avgRating, costForTwo, cuisines, sla, cloudinaryImageId } =
    resData?.info;
  return (
  
    <div className="m-6 p-4 w-[300px] h-[320px] rounded-2xl transition ease-in-out  hover:scale-110 hover:duration-300 ... ">
      
      <img
        className="w-72  rounded-xl h-40  "
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />

      <div className="font-bold text-center text-xl h-8">
        {name.length < 15 ? name : name.toString().substring(0, 22) + "..."}
      </div>

      <div className="flex justify-between mt-4">
        <div className="res-ratings font-semibold bg-green-500 rounded-md pr-2">
          ⭐{avgRating}
        </div>
        <div className="res-eta">{sla.slaString}</div>
        <div className="res-eta">{costForTwo}</div>
      </div>

      <div className="break-all mt-3  italic">
        {/* {console.log(cuisines)} */}
        {cuisines.length > 5
          ? cuisines.slice(0, 4).toString() + "..."
          : cuisines.toString()}
      </div>
<div>username:{loggedInUser}</div>
    </div>
  );
};


//Higher order compoennt which takes RestaurantCard as input and gives output with label promoted on Restaurant Card 
export const withPromotedLabel = (RestaurantCard)=>{
  return (props)=>{
    return (
      <div className=" transition ease-in-out  hover:scale-110 hover:duration-300 ...">
      <label className="absolute bg-black text-white m-2 p-2 rounded-lg ">promoted</label>
      <RestaurantCard {...props}/>

      </div>
    )
  }
}

export default RestaurantCard;
