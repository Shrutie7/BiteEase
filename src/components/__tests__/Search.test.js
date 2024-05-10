import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Body from "../Body";
import { BrowserRouter } from "react-router-dom";
import MOCK_data from "../../mocks/mockRestaurantListData.json";
import { act } from "react-dom/test-utils";
// it will throw error as fetch is not defined when we render a component it gets rendered on jsdom(browser like) not on browser , jsdom dont have all superpowers of browser like fetch(given by browser to us not given natively in core of javaScript) etc

// jest dont understand fetch creating mock fetch function and mock data
beforeAll(()=>{
    console.log("before All");
})
beforeEach(()=>{
    console.log("before Each");
})
afterAll(()=>{
    console.log("after All");
})
afterEach(()=>{
    console.log("after Each");
})
global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => {
        return Promise.resolve(MOCK_data);
      },
    });
  });
it("Should search reslist for pizza as input value input", async () => {
  //whenevr we have fetch/async function/state update in react wrap render method in act function
  // act comes from ("react-dom/test-utils") act function returns a promise . act function takes another async function which will render <Body/>

  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  expect(cardsBeforeSearch.length).toBe(16);


  const searchbtn = screen.getByRole("button",{name:"Search"});

  const searchinput = screen.getByTestId("searchInput")

//   console.log(searchinput);
//   console.log(searchbtn);
//   expect(searchbtn).toBeInTheDocument();

// firevent for onchange of input box and then click of search button 
fireEvent.change(searchinput,{target:{value:"pizza"}});

fireEvent.click(searchbtn);

//screen should load that many no of res cards use getAllByTestId
const cardsAfterSearch = screen.getAllByTestId("resCard");
// this will give all rescards that we get when pizza is searched
expect(cardsAfterSearch.length).toBe(4);

});


it("Should test top Rated Restaurants",async()=>{

    await act(async()=>{
        render(
            <BrowserRouter>
                <Body/>
            </BrowserRouter>
        )
    });
    const cardsBeforeFilter = screen.getAllByTestId("resCard");

    expect(cardsBeforeFilter.length).toBe(16);
    const topRatedbtn = screen.getByRole("button",{name:"Top Rated Restaurant"});
    fireEvent.click(topRatedbtn);

    const cardsAfterFilter = screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(10);

})
