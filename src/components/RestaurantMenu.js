import { useEffect, useState } from "react";
import ShimmerMenu from "./ShimmerMenu";
import { CDN_URL1, MENU_API_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import arrowup from "../../logos/Arrow.png";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { MENU_API_URL } from "../utils/constant";
import RestaurantCategories from "./RestaurantCategories";

//only single responsiblity of this compoenent is to display data onto ui
//to fetch data from api we will use custom hook useRestaurantMenu
const RestaurantMenu = () => {
  //useParams gives an object resId thats passed in route /restaurants/123 hence it will give {resId:'123'} hence destructuring resId that contains id passed in route pass this resId in api url
  const { resid } = useParams();
  console.log(resid);
  let resInfo = useRestaurantMenu(resid);


  //initially we give null means no accordian is open if 0 is given then first accordian is open on initial render

  const[showIndex,setshowIndex]=useState(0)


  const {
    name,
    cuisines,
    locality,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
    sla,
    aggregatedDiscountInfoV2,
  } = resInfo?.cards[0]?.card?.card?.info || {};

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card || [];

  console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const Categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (d) =>
        d?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
 

  return (
    <>
      {resInfo !== null ? (
        <div className="menu">
          <div className="menu-con flex gap-x-96">
            <div className="menu-con1 ml-72 ">
              <div className="text-xl font-bold">{name}</div>
              <div>{cuisines?.join(",")}</div>
              <div>
                {locality} {sla?.lastMileTravel} km
              </div>
            </div>
            <div className="menu-con2 shadow-2xl rounded-lg w-16 ml-80 ">
              <div className="text-center pb-1 text-green-700 font-bold ">
                ⭐{avgRatingString}
              </div>
              <hr />
              <div className="text-center pt-2 text-xs font-semibold">
                {totalRatingsString}
              </div>
            </div>
          </div>

          <div className="menu-con3 ml-72 border-b-2 w-[900px]">
          
          </div>
          <div className="menu-con4 flex gap-x-36 ml-72">
            <h3 className="font-bold">{sla?.minDeliveryTime} MINS</h3>
            <h3 className="font-bold">{costForTwoMessage} </h3>
          </div>

          <div className="menu-con5 ">
            <div className="menu-disccard flex  ml-[260px]">
              {aggregatedDiscountInfoV2?.descriptionList?.map((d, i) => (
                <>
                  {
                    <div
                      className="menu-disccon1 shadow-2xl rounded-lg p-2 ml-6 mt-3"
                      key={d.id}
                    >
                      <div>
                        {d.meta?.toString().substring(0, d.meta?.indexOf("|"))}
                      </div>
                      <div>
                        {d.meta
                          ?.toString()
                          .substring(d.meta?.indexOf("|") + 1, d.meta?.length)}
                      </div>
                    </div>
                  }
                </>
              ))}
            </div>
            <div className="menu-disccard2"></div>
          </div>

          {/* Categories Accordian */}

          <div className="menu-con6 ">
            {Categories.map((category,index) => (
              <RestaurantCategories key={category?.card?.card?.title} data ={category?.card?.card} showItems={index===showIndex ? true:false} setshowIndex={()=>{index===showIndex ? setshowIndex(null):setshowIndex(index)}}/>
                
              
            ))}
          </div>
        </div>
      ) : (
        <ShimmerMenu />
      )}
    </>
  );
};

export default RestaurantMenu;
