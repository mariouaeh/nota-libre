import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";
class Home extends Component {
  render() {
    let SliderT = "”Nunca te rindas los milagros ocurren todos los días.”";
    return (
      <div className="Home">
        <Slider title={SliderT}>Notas</Slider>
        <div className="center">
          <div id="content">
            <h1 className="subheader">Notas Recientes</h1>
            <Articles
            home="true"></Articles>
          </div>
        </div>
        <Sidebar></Sidebar>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default Home;
