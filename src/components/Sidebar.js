import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

class Sidebar extends Component {
  searchRef = React.createRef();

  state = {
    search: "",
    redirect: false

  };

  RedirectToSearch = (e) => {
    e.preventDefault();

    this.setState({
      search: this.searchRef.current.value,
      redirect: true,
    });
  };


  render() {
    if (this.state.redirect) {
      return <Redirect to={"/redireccion/" + this.state.search}></Redirect>;
    }
    return (
      <aside id="sidebar" className="sidebar">
        {this.props.blog && (

            <div id="nav-blog" className="nav-blog sidebar-item">
              <h3>Regalame una nota</h3>
              <Link to={"/blog/crear/"} className="btn btn-success">
                Crear Nota
              </Link>
            </div>

        )}

        <div id="search" className="sidebar-item">
          <h3>Buscador</h3>
          <p>Encuentra la Nota que buscas</p>
          <form onSubmit={this.RedirectToSearch}>
            <input type="text" name="search" ref={this.searchRef} />
            <input type="submit" name="submit" value="Buscar" className="btn" />
          </form>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
