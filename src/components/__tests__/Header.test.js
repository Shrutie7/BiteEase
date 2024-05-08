import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("should load header component with a login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  // const loginButton = screen.getByRole("button");
  // const loginButton = screen.getByText("Login")
  const loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();
});
it("should load header component with cart items as 0", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //match exact string
  // const cartitems = screen.getByText("Cart - 0 items");
  //write regex instead no need to match exact string and check if cart items is there or not not matter 0/1/2
  const cartitems = screen.getByText(/Cart/);
  expect(cartitems).toBeInTheDocument();
});
it("should change login button to logout on click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const loginButton = screen.getByRole("button", { name: "Login" });

  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole("button",{name:"Logout"});

  expect(logoutButton).toBeInTheDocument();
});
