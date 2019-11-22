import React, { Component } from "react";
import MainRooter from "./MainRooter";
import Header from "./components/Header";
class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <MainRooter />
      </React.Fragment>
    );
  }
}
export default Main;
