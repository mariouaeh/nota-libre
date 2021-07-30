import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";
class Blog extends Component {


  render() {

    let SliderT = "“Aquí nacen sueños, pensamientos y emociones de muchas personas”"
    return (
      <div className="Home">
        <Slider 
        title={SliderT}
        size="slider-small"
        ></Slider>
        <div className="center">
          <div id="content">
            <h1 className="subheader"> Todas Las Notas  </h1>
            <Articles></Articles>
          </div>
        </div>
        <Sidebar blog="true"></Sidebar>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default Blog;
