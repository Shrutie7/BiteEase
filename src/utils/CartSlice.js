//create slice and put in appStore
//createSlice helps to create slice comes from @reduxjs/toolkit
//takes an object which has -name of slice -initial state of slice (object) -reducers(action and reducer function)(object)
//   createSlice return an object in cartSlice

import { createSlice,current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    items: [],
  },
  reducers: {
    //addItem is an action which takes a reducer function that takes 2 parameter state(initial state which has items) and action this reducer function actually modifies the state of the slice of store
    addItem: (state, action) => {
      //mutating the state (modifying state directly)
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      //make item length to 0 so cart is empty


      //RTK => either mutate state or return a new state 
      // state.items.length = 0; //orginalState= []


//this new object will be replaced inside originalState=[{items:[]}]
      return {items:[]}
    },
    // incrementItem:(state,action)=>{
    //   let updated = state.items?.map((d)=>{
    //     console.log(d)
    //     if(d?.card?.info?.id===action.payload)
    //     {

    //       console.log(current(d))
    //       let incr =  d?.card?.info?.inStock
    //       let inc = incr + 1;
         
    //       return {
    //         ...d?.card?.info,
    //         inStock:inc
    //       }

    //     }
    //     else{
    //       return d?.card?.info
    //     }
    //   })
    //   return updated
    // }
  },
});

//we export both actions and reducer
export const {addItem,removeItem,clearCart}=cartSlice.actions
export default cartSlice.reducer;
