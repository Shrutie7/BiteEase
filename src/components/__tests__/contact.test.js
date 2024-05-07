import Contact from "../Contact"
import { render,screen } from "@testing-library/react";
import "@testing-library/jest-dom"

// getByRole are roles defined by jest in the testing library
//role can be a heading or a button etc 
test("Should load contactus component",()=>{

    render(<Contact/>); //rendering contact compoennt on JSDOM

    const heading = screen.getByRole("heading"); // try to find heading inside my rendered screen using getByRole

    //Assertion

    expect(heading).toBeInTheDocument(); //trying to search if heading is inside the document or not 
})
test("Should load button inside contactUs component",()=>{

    render(<Contact/>); //rendering contact compoennt on JSDOM


    // const button = screen.getByRole("button");// try to find button inside my rendered screen using getByRole or using getByText
    const button = screen.getByRole("button");// try to find button inside my rendered screen using getByRole or using getByText
    // const button = screen.getByText("Random") // try to find on my screen anywhere text as Random and it will fail 

    //Assertion
    expect(button).toBeInTheDocument(); //trying to search if button is inside the document or not 
})
test("Should load input name inside contactUs component",()=>{

    render(<Contact/>); //rendering contact component on JSDOM

    const input = screen.getByPlaceholderText("name");

    //Assertion
    expect(input).toBeInTheDocument(); //trying to search if input is inside the document or not 
})
// whenevera test case will fail it will also show what was rendered on the screen
//getByRole -> expecting only 1 result 
//getAllByRole -> expecting all results possible
//role for input boxes is textbox
// whenever there are multiple elements in 1 role use getAllByRole instead of getByRole
test("Should load 2 input boxes inside contactUs component",()=>{

    render(<Contact/>); //rendering contact component on JSDOM

    //Querying
    const inputBoxes = screen.getAllByRole("textbox");
    console.log(inputBoxes.length); //array of 2 objects htmlinputelement / react element virtual dom react element jsx is react element and react element is object and the object that we see is an input tag 

    //Assertion
    expect(inputBoxes.length).toBe(2); //trying to search if input boxes are 2 or not
    // expect(inputBoxes.length).not.toBe(3); //trying to search if input boxes is not 3
})

//console.log inside test case returns you jsx element that is react object/react fibre node
//when we do querying we can do getByRole / getAllByRole etc and we will get peace of jsx return to us and then we can assert on this 
// everytime in our test case we will render , query and then assert something 
// when test file becomes very big in order to manage it we can group our test cases using describe 
