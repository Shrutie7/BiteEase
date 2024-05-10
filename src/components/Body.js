import { Link } from "react-router-dom";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
// import default export without curly braces
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useState, useEffect, useContext, useRef } from "react";
import userContext from "../utils/UserContext";
import { CDN_URL2 } from "../utils/constant";
import { CDN_URL3 } from "../utils/constant";
// import rightarrow from "../../icons/rightarrow.png";
// import leftarrow from "../../icons/leftarrow1.png";

const Body = () => {
  const [listdata, setlistdata] = useState([]);
  const [onminddata, setonminddata] = useState([]);
  const [bestoffersdata, setbestoffersdata] = useState([]);
  const ref = useRef();
  const ref1 = useRef();
  const imageref = useRef();
  const imageref1 = useRef();

  const [startingpoint, setstartingpoint] = useState(0);
  const [endingpoint, setendingpoint] = useState(1);
  const [startingpoint1, setstartingpoint1] = useState(0);
  const [endingpoint1, setendingpoint1] = useState(1);
  const scrollAmount = 100;
  const leftbtnhandler = () => {
    ref.current.scrollLeft =
      ref.current.scrollLeft - (imageref.current.clientWidth + 160);
    let distance = ref.current.scrollLeft - (imageref.current.clientWidth + 160);
    setstartingpoint(distance);
  };
  const rightbtnhandler = () => {
    ref.current.scrollLeft =
      ref.current.scrollLeft + imageref.current.clientWidth + 160;
    let distance = ref.current.scrollLeft + imageref.current.clientWidth + 160;
    setstartingpoint(distance);
    setendingpoint(ref.current.scrollWidth - ref.current.scrollLeft);
  };


  const leftbtnhandler11 = () => {
    ref1.current.scrollLeft =
      ref1.current.scrollLeft - (imageref1.current.clientWidth + 1100);
    let distance = ref1.current.scrollLeft - (imageref1.current.clientWidth + 1100);
    setstartingpoint1(distance);
  };
  const rightbtnhandler11 = () => {
    ref1.current.scrollLeft =
      ref1.current.scrollLeft + imageref1.current.clientWidth + 1540;
    let distance = ref1.current.scrollLeft + imageref1.current.clientWidth + 1540;
    setstartingpoint1(distance);
    setendingpoint1(ref1.current.scrollWidth - ref1.current.scrollLeft);
  };
const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  //we can pass the state updating function also to value in provider in usercontext.providerand extract it here and everywhere in our app loggedinUser value will change with our input value in about page also where we r using consumer which is coming via lazy loading about us is coming from lazy loading

  const { setuserInfo, loggedInUser } = useContext(userContext);
  // WHENEVER STATE VARIABLE UPDATES REACT WILL TRIGGER THE RECONCILIATION CYCLE AND RE-RENDER THE COMPONENT
  const [filteredrest, setfilteredrest] = useState([]);

  // fetch returns a promsie to resolve a promise use then,catch OR async-await
  const fetchData = async () => {
    const datafetch = await fetch(
"https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await datafetch.json();

    // console.log(
    //   json.data.cards[4].card.card["gridElements"]?.infoWithStyle.restaurants
    // );

    let resmain =
      json?.data?.cards[4]?.card?.card["gridElements"]?.infoWithStyle
        ?.restaurants;

    let resminddata = json?.data?.cards[0]?.card?.card["imageGridCards"]?.info;

    // let resofferdata =
    //   json?.data?.cards[1]?.card?.card["gridElements"]?.infoWithStyle?.info;
    // console.log( json?.data?.cards[0]);

    // setbestoffersdata([...resofferdata]);
    setonminddata([...resminddata]);
    setlistdata(resmain);
    setfilteredrest(resmain);
  };
  {
    // console.log(listdata);
  }

  // called after the compoenent renders
  useEffect(() => {
    fetchData();
    console.log("useEffect is loaded");
  }, []);

  // will print first than useEffect console bcoz component renders first once is done then useEffect will render...
  console.log("body is loaded");

  let [ressearch, setressearch] = useState("");

  const onchangehandler = (e) => {
    setressearch(e.target.value);

    if (e.target.value === "") {
      setfilteredrest([...listdata]);
    }
  };

  console.log(ressearch);

  console.log("Body component rendered");

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1>Looks like you are offline!! please check internet connection</h1>
    );
  }

  return (
    <div className="body">
      <div className="filter flex">
        <div className="m-4 p-4">
          <input
            type="text"
            data-testid = "searchInput"
            placeholder="Search Restaurants"
            className="border border-solid border-black pl-1"
            value={ressearch}
            onChange={(e) => {
              onchangehandler(e);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              let filteredrest = listdata.filter(
                (res) =>
                  JSON.stringify(res)
                    .toLowerCase()
                    .includes(ressearch.toLowerCase())

                // res.info.name.toLowerCase().includes(ressearch.toLowerCase())
              );

              setfilteredrest([...filteredrest]);
              console.log(ressearch);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              let FilteredList = listdata.filter(
                (res) => res.info.avgRating > 4.2
              );

              setfilteredrest([...FilteredList]);
            }}
          >
            Top Rated Restaurant
          </button>

          <button
            className="filter-btn px-4 py-2 bg-gray-100 ml-4 rounded-lg"
            onClick={() => {
              // setlistdata([...listdata]);
              setfilteredrest([...listdata]);
              setressearch("");
            }}
          >
            R
          </button>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={loggedInUser}
              onChange={(e) => setuserInfo(e.target.value)}
              className="border border-solid border-black p-1"
            />
          </div>
        </div>
      </div>

      <div>
        
        {/* { bestoffersdata?.length>0? */}
        <div className="flex justify-between">
        <div className="font-bold text-[26px] font-sans flex justify-start ml-5 ">Best Offers for you</div>
        <div className="flex gap-4 mr-10 mb-4">
        {startingpoint > 0 ? (
            <img
              // src={leftarrow}
              onClick={() => leftbtnhandler()}
              className="h-8 w-8 cursor-pointer"
            />
          ) : (
            <img
              // src={leftarrow}
              className="h-8 w-8 pointer-events-none opacity-40"
            />
          )}
          {startingpoint <= endingpoint ? (
            <img
              // src={rightarrow}
              onClick={() => rightbtnhandler()}
              className="h-8 w-8 cursor-pointer"
            />
          ) : (
            <img
              // src={rightarrow}
              className="h-8 w-8 pointer-events-none opacity-40"
            />
          )}
        </div>
        
        </div>

        <div
          className="flex  overflow-hidden scroll-smooth ml-5 mr-5 "
          ref={ref}
        >
          {/* {bestoffersdata?.map((offerd, ind) => (
            <div className="flex ml-[40px] min-w-fit h-[300px] first:ml-0" ref={imageref}>
              <img src={CDN_URL3 + offerd?.imageId} />
           
            </div>
          ))} */}
        </div>
      </div>


      <div className="flex justify-between mt-7">
        <div className="font-bold text-[26px] font-sans flex justify-start ml-5 ">Whats on your mind?</div>
        <div className="flex gap-4 mr-10">
        {startingpoint1 > 0 ? (
            <img
              // src={leftarrow}
              onClick={() => leftbtnhandler11()}
              className="h-8 w-8 cursor-pointer"
            />
          ) : (
            <img
              // src={leftarrow}
              className="h-8 w-8 pointer-events-none opacity-40"
            />
          )}
          {startingpoint1 <= endingpoint1 ? (
            <img
              // src={rightarrow}
              onClick={() => rightbtnhandler11()}
              className="h-8 w-8 cursor-pointer"
            />
          ) : (
            <img
              // src={rightarrow}
              className="h-8 w-8 pointer-events-none opacity-40"
            />
          )}
        </div>
        
        </div>
      <div>
        {onminddata?.length > 0 ? (
          <div className="flex mt-10 overflow-hidden scroll-smooth ml-5 mr-5" ref={ref1}>
            {onminddata?.map((mitem, ind) => (
              <div className="flex first:ml-0 min-w-max h-[168px]"  ref={imageref1}>
                <img src={CDN_URL2 + mitem?.imageId} />
              </div>
            ))}
          </div>
        ) : (
          <Shimmer></Shimmer>
        )}
      </div>

      {/* <div className="font-bold text-lg mt-2 ml-2">Top Restaurant Chains in Bangalore</div> */}
      {listdata?.length > 0 ? (
        <div className="flex flex-wrap ml-12">
          {/* contain a lot of restaurant cards hence built seperate compoennt for restaurant card */}

          {filteredrest.map((restaurant, i) => (
            <Link
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              {" "}
              {/* if the restaurant has avgRating>4.2 then it is promoted then add promoted label to it...  */}
              {restaurant.info.avgRating > 4.0 ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      ) : (
        <>
          <Shimmer />
        </>
      )}
    </div>
  );
};

export default Body;
