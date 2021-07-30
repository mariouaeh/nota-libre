import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";
import Moment from "react-moment";
import 'moment/locale/es-mx';
import defaultImg from "../assets/images/default2.jpg";

class Article extends Component {
    url = Global.url;
    passwordref = React.createRef();
    state = {
        article: false,
        status: null,
        isToggleOn: false
    }
    componentWillMount(){
        this.getArticle();
    }
getArticle = ()=>{
    let id = this.props.match.params.id;
    axios.get(this.url +"get_article/"+ id)
    .then(res=> {
        this.setState({
            article: res.data.article,
            status: 'succes'
        })
    }).catch(err =>{
        this.setState({
            article: false,
            status: 'success'
        })
    })
   
}

deletArticle = (id) =>{
  swal({
    title: "¿Seguro que quieres borrar esto ?",
    text: "se borrara todo el contenido de este articulo, ¿estas de acuerdo?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      axios.delete(this.url + "get_article/" + id)
      .then(res=>{
        this.setState({
          article: res.data.article,
          status: 'deleted'
        })
      })
      swal("borrado exitosamente", {
        icon: "success",
      });
    } else {
      swal("no se ha borrado nada -----");
    }
  });

}

ocultar = (e) => {
  e.preventDefault();
  if (this.passwordref.current.value === "Magneto") {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
    console.log("enter");
  }
};


  render() {
    if(this.state.status === 'deleted'){
        return <Redirect to='/blog'></Redirect>
    }


let article = this.state.article;
    return (
      <div className="">
        <div className="center" >
          { console.log(this.state.article)}
          <section id="content" className="cover-article">
          {this.state.article &&
          <div>
            <article className="article-detail " >
              <div className="image-wrap ">
              {
                            article.image !== null? (
                                <img src={this.url+"get_image/"+article.image} alt={article.title} />
                            ): (
                                <img src={defaultImg} alt={article.title} />
                            )
                        }
              </div>

              <h1 className="subheader">{article.title}</h1>
              <p className="article-content" id="p-content">
                 {article.content}
              </p>
              <span className="date">
                <Moment locale="es" fromNow>{article.date}</Moment> ,   by <strong>{article.author}</strong>
              </span>

            <div>
            <p className={this.state.isToggleOn ? 'm' : 'empty'} >
                <button  className="btn btn-danger" onClick={
                  () =>{
                      this.deletArticle(article._id)
                  }
                }>Eliminar</button>
                <Link to={'/blog/edit/'+article._id}  replace  className="btn btn-warning">Editar</Link>
              </p>
            </div>
              
              <div className="clearfix"></div>
            </article>

            </div>
            }
            {!this.state.article &&
            <div id="article">
                <h2 className="subheader">El articulo no existe</h2>
                <p>Intentelo Mas tarde......</p>
            </div>}

            {!this.state.article == null && this.state.status === "success"&&
            <div id="article">
                <h2 className="subheader">Cargando.......</h2>
                <p>Espere unos segundos.</p>
            </div>}
          </section>
          <aside className="sidebar">
          <div className="nav-blog sidebar-item">
              <form
                onSubmit={this.ocultar}
                className={this.state.isToggleOn ? "empty" : "n"}
              >
                <div className="form-group ">
                  <h3>Password</h3>
                  <input type="text" ref={this.passwordref}></input>
                  <div>
                    <input
                      type="submit"
                      value="Enviar"
                      className="btn btn-success"
                    />
                  </div>
                </div>
              </form>
            </div>
          </aside>

          <Sidebar></Sidebar>

          <div className="clearfix"></div>
        </div>

      </div>
    );
  }
}

export default Article;
