import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Formulario extends Component {
  nombreRef = React.createRef();
  apellidoseRef = React.createRef();
  bioRef = React.createRef();
  genHombreRef = React.createRef();
  genMujerRef = React.createRef();
  genOtroRef = React.createRef();

  state = {
    user: {},
  };
  recibirForm = (e) => {
    e.preventDefault();

    let genero = "hombre";
    if (this.genHombreRef.current.checked) {
      genero = this.genHombreRef.current.value;
    } else if (this.genMujerRef.current.checked) {
      genero = this.genMujerRef.current.value;
    } else if (this.genOtroRef.current.checked) {
      genero = this.genOtroRef.current.value;
    } else {
      genero = false;
    }
    let user = {
      nombre: this.nombreRef.current.value,
      apellidos: this.apellidoseRef.current.value,
      biografia: this.bioRef.current.value,
      genero: genero,
    };

    this.setState({
      user: user,
    });
  };

  render() {
    let user = {};
    if (this.state.user.nombre) {
      user = this.state.user;
    }
    return (
      <div id="Formulario">
        <Slider title="Bienvenido al Formulario " size="slider-small"></Slider>
        <div className="center">
          <div id="content">
            <h1 className="subheader">Formulario</h1>
            {!(Object.keys(this.state.user).length === 0) && (
              <div id="user-data">
                {this.state.user.nombre && (
                  <p>
                    Nombre: <strong>{user.nombre}</strong>
                  </p>
                )}
                {this.state.user.apellidos && (
                  <p>
                    Apellidos: <strong>{user.apellidos}</strong>
                  </p>
                )}
                {this.state.user.biografia && (
                  <p>
                    Biografia: <strong>{user.biografia}</strong>
                  </p>
                )}
                {this.state.user.genero && (
                  <p>
                    Genero: <strong>{user.genero}</strong>
                  </p>
                )}
              </div>
            )}
            <form
              className="mid-form"
              onSubmit={this.recibirForm}
              onChange={this.recibirForm}
            >
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  ref={this.nombreRef}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  ref={this.apellidoseRef}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Biografia</label>
                <textarea name="bio" ref={this.bioRef}></textarea>
              </div>

              <div className="form-group radibuttons">
                <input
                  type="radio"
                  name="genero"
                  value="hombre"
                  ref={this.genHombreRef}
                />{" "}
                Hombre
                <input
                  type="radio"
                  name="genero"
                  value="mujer"
                  ref={this.genMujerRef}
                />{" "}
                Mujer
                <input
                  type="radio"
                  name="genero"
                  value="otro"
                  ref={this.genOtroRef}
                />{" "}
                Otro
              </div>

              <div className="clearfix"></div>

              <input type="submit" value="Enviar" className="btn btn-success" />
            </form>
          </div>
        </div>
        <Sidebar></Sidebar>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default Formulario;
