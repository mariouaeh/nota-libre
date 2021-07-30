import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Formulario from "./components/Formulario";
import Article from "./components/Article";
import Search from "./components/Search";
import CreateArticle from "./components/CrateArticle";
import EditArticle from "./components/EditArticle";

class Router extends Component {
  render() {
    
    return (
      <BrowserRouter>
        <Header></Header>
       
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/blog" component={Blog}></Route>
              <Route exact path="/blog/article/:id" component={Article}></Route>
              <Route exact path="/blog/crear/" component={CreateArticle}></Route>
              <Route exact path="/blog/edit/:id" component={EditArticle}></Route>
              <Route exact path="/blog/busqueda/:search" component={Search}></Route>
              <Route exact path="/formulario" component={Formulario}></Route>
              {/* Se crea una ruta de redireccion con una funcion de callback  */}
              <Route exact path="/redireccion/:search" render = {
                (props)=>{
                  let search = props.match.params.search;
                  return(
                    <Redirect to ={'/blog/busqueda/'+ search}></Redirect>
                  )
                }
              }></Route>

              <Route
                exact
                path="/prueba3"
                render={() => (
                  <React.Fragment>
                    <h1 className='subheader'>Estamos En reparación ............</h1>
                    <div className="pixelart-to-css"></div>
                  </React.Fragment>
                )}
              ></Route>
              <Route
                exact
                path="/prueba4/:nombre/:apellidos?"
                render={(props) => {
                  let name = props.match.params.apellidos
                    ? props.match.params.nombre +
                      " " +
                      props.match.params.apellidos
                    : props.match.params.nombre;
                  return (
                    <div id="content">
                      <h1>Paguina de parametros</h1>
                      <h2>{name}</h2>
                    </div>
                  );
                }}
              ></Route>
              <Route component={NotFound}></Route>
            </Switch>

        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default Router;
