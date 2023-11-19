import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./components/Error";
import userContext from "./utils/UserContext";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import Cart from "./components/Cart";
// import Grocery from "./components/Grocery";

//lazy loading / on demand loading / dynamic import/ code splitting/chunking/Dynamic bundling
//lazy takes a callback function which takes import which takes path of compoennt now grocery will form another bundle other than the main bundle ...
const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

//enclose grocery compoenent inside suspense bcoz by the time grocery compoennts come on ui it takes about 12 ms say , then react suspends the rendering as it didnt find grocery compoennt coz it was loaded lazily or on demand hence react throws error put suspend
//give a placeholder fallback to suspense which shows what will come on ui by the time grocery is actually loaded (in that 12 ms ...)

// Styles/inlinecss is given as a JS object inside jsx we write two brackets
// AppLayout is root level component
const AppLayout = () => {
  const [userInfo, setuserInfo] = useState();
  useEffect(() => {
    const data = {
      username: "Shruti Lakhotiya",
    };
    setuserInfo(data.username);
  }, []);

  //depends on where you provide the userContext.provider if you dont provide it anywhere it takes default/initial value . if you waarp your whole app in userContext.provider it will take the new value for entire app. if you give to header seperately it takes value given to header and shows only in header that new value
  return (
    // wherever u want to use store wrap whole app in Provider just like context.provider
//provide store to our whole app bridge between react and redux pass store as props in key store in provider that is imported from "react-redux",we can give provider to a specific portion of our app as well for just header say like we gave userContext.provider to a specific portion only 
//connect store to App
<Provider store={appStore}>
    {/* default value */}
    <userContext.Provider value={{loggedInUser:userInfo ,setuserInfo}}>
    {/* Shruti Lakhotiya */}
    <div className="App">
    {/* <userContext.Provider value={{loggedInUser:"ELON MUSK"}}> */}
    {/* ELON MUSK */}
      <Header />
      {/* </userContext.Provider> */}
      <Outlet />
    </div>
    </userContext.Provider>
    </Provider>

  );
};


//createBrowserRouter takes object of paths
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading......</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resid",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading.......</h1>}>
            <Grocery />
          </Suspense>
        ),
      },

      {
        path:"/cart",
        element:<Cart/>
      }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
