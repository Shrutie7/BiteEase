import { render } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard"
it("should render rescard component with props data",()=>{
    render(<RestaurantCard resData={MOCK_data}/>)
})