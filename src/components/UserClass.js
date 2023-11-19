import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.name + " Child Constructor");

    this.state = {
      userInfo: {
        avatar_url:
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F1144%2F1144760.png&tbnid=A_c-1RPK90rYoM&vet=12ahUKEwjdkL7It56BAxVkz6ACHdBOA6EQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ficons%2Fuser&docid=yC2pK8Mg3lF9dM&w=512&h=512&q=user%20icon&ved=2ahUKEwjdkL7It56BAxVkz6ACHdBOA6EQMygAegQIARB0",
        name: "dummy",
        location: "default",
      },
    };
  }

  async componentDidMount() {
    console.log(this.props.name + " Child ComponentDidMount");

    const data = await fetch("https://api.github.com/users/Shrutie7");
    const json = await data.json();


    this.setState({
      userInfo: json,
    });
  }
  componentDidUpdate(){
    console.log("componentDidUpdate");
  } 
  
  componentWillUnmount(){
    console.log("componentWillUnmount");
  }
  render() {
    // const { name, location } = this.props;

    const { name, location, avatar_url } = this.state.userInfo;
    console.log(this.props.name + " Child render");

    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Location:{location}</h3>
      </div>
    );
  }
}
export default UserClass;
