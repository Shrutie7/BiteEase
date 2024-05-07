import { fireEvent, render,screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("should render header component with a login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
//   if multiple login button on screen we want only button which has name as Login
 const loginbutton = screen.getByRole("button",{name:"Login"});

//  const loginbutton = screen.getByText("Login");
  expect(loginbutton).toBeInTheDocument();

});
it("should render header component with cart items 0", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

//   const cartItems = screen.getByText("Cart - 0 items");
// we can also pass in regex over here when passing text
  const cartItems = screen.getByText(/Cart/);

//  const loginbutton = screen.getByText("Login");
  expect(cartItems).toBeInTheDocument();

});
it("should change Login button to logout on click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

const loginButton = screen.getByRole("button",{name:"Login"});
//simulate the click event using fireEvent
fireEvent.click(loginButton);
const logoutbutton = screen.getByRole("button",{name:"Logout"})

//  const loginbutton = screen.getByText("Login");
  expect(logoutbutton).toBeInTheDocument();

});
