import { render, screen } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard";
import { withPromotedLabel } from "../RestaurantCard";
import MOCK_data from "../../mocks/resCardMocks.json";
import "@testing-library/jest-dom";

it("should render rescard component with props data",()=>{
    render(<RestaurantCard resData={MOCK_data}/>)
    const name = screen.getByText("Pizza Hut");
    expect(name).toBeInTheDocument();
})
it("should render rescard component with promoted label",()=>{
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    render(<RestaurantCardPromoted resData={MOCK_data}/>)
    const name = screen.getByText("Pizza Hut");
    expect(name).toBeInTheDocument();
})