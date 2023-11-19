//Create store using configureStore that come from @reduxjs/toolkit
import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./CartSlice";

const appStore = configureStore({
    //configure store is object which again takes it own reducer that is combination of small reducers of different stores/slices
    reducer:{
        cart:cartReducer
    }

});

export default appStore;

