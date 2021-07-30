import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";


class Search extends Component {

  render() {
    let search = this.props.match.params.search;
    let SliderT = "Busqueda: " + search;
    return (
      <div className="Home">
        <Slider 
        title={SliderT}
        size="slider-small"
        ></Slider>
        <div className="center">
          <div id="content">
            <Articles search={search}></Articles>
          </div>
        </div>
        <Sidebar blog="true"></Sidebar>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default Search;
