import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MOCK_DATA from "../../mocks/mockRestaurantMenu.json";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it("should render Restaurant Menu Component", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart/>
        </Provider>
      </BrowserRouter>
    );
  });
  const accordianHeader = screen.getByText("Pasta(7)");
  fireEvent.click(accordianHeader);
  const foodItems = screen.getAllByTestId("foodItems");

  expect(foodItems.length).toBe(14);

  const cartItemsBeforeAdd = screen.getByText("Cart - 0 items");

  expect(cartItemsBeforeAdd).toBeInTheDocument();
  const addbtns = screen.getAllByRole("button", { name: "ADD" });
  console.log(addbtns.length); //14 add btn as 14 items 
  //click on first ADD button
  fireEvent.click(addbtns[0],"length");
  // header should change with Cart items as 1 hence render both <Header/> and <RestaurantMenu/>

//check if in Header cart items updated to 1 or not 

const cartItems = screen.getByText("Cart - 1 items");
expect(cartItems).toBeInTheDocument();

fireEvent.click(addbtns[1]);
expect(screen.getByText("Cart - 2 items")).toBeInTheDocument();


const countcart = screen.getAllByTestId("cartitems");
console.log(countcart.length,"sc");

expect(screen.getAllByTestId("cartitems").length).toBe(2);

// click on clearcart 

const clearcartbtn = screen.getByRole("button",{name:"Clear Cart"});
fireEvent.click(clearcartbtn);
const countcart1 = screen.getAllByTestId("cartitems");
console.log(countcart1.length,"scss");
expect(screen.getAllByTestId("cartitems").length).toBe(1);//1 bcoz we gave to outer div data-testid as cartitems hence comes 1 not 0

expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
});
