import UserClass from "./UserClass";
import {Component} from "react";

import userContext from "../utils/UserContext";

class About extends Component {



  constructor(props) {
    super(props);
    console.log("Parent constructor");
  }
  componentDidMount(){
    console.log("Parent ComponentDidMount");
  }

  render() {
    console.log("Parent render");
    return (
      <div className="about">
      {/* to access context using consumer that takes a callback function in which jsx is there */}
      <userContext.Consumer>
        {({loggedInUser})=>(<h1>{loggedInUser}</h1>)}
      </userContext.Consumer>
        <h1>About us class Component</h1>

        <UserClass name={"First child"} location={"Raipur Classbased"} />
  
      </div>
    );
  }
}

export default About;
