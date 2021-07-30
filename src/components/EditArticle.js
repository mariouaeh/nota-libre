import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import alert from "sweetalert";
import Global from "../Global";
import defaultImg from "../assets/images/default.png";
import Sidebar from "./Sidebar";

class EditArticle extends Component {
  titleRef = React.createRef();
  contenRef = React.createRef();
  authorRef = React.createRef();
  url = Global.url;
  articleId = null;
  state = {
    article: {},
    status: null,
    selectedFile: null,
  };

  constructor(props) {
    super(props);
    // Se carga el objeto para validar el formulario
    // En el curso utiliza el componentWillMount
    this.articleId = this.props.match.params.id;
    this.getArticle(this.articleId);
    this.validator = new SimpleReactValidator({ locales: "es" });
  }

  getArticle = () => {
    axios.get(this.url + "get_article/" + this.articleId).then((res) => {
      this.setState({
        article: res.data.article,
      });
    });
  };

  ChangeState = () => {
    this.setState({
      article: {
        title: this.titleRef.current.value,
        content: this.contenRef.current.value,
        author: this.authorRef.current.value,
        image: this.state.article.image
      },
    });
    console.log(this.state);

    this.validator.showMessages();
    this.forceUpdate();
  };

  saveArticle = (e)=>{
        
    if (this.validator.allValid()){
        e.preventDefault();
        this.ChangeState();
        axios.put(this.url+ "get_article/"+this.articleId,this.state.article)
            .then(res =>{
                if(res.data){
                    this.setState({
                        article: res.data.articleStored,
                        status: 'success'
                    })

                    alert('Articulo Editado ',
                        'El articulo fue exitosamente editado ....',
                        'success')

                    // subir la imagen
                    if(this.state.selectedFile !== null){
                        let articleId = this.state.article._id;
                        const formData = new FormData();
                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        )
                        // peticion con axios
                            axios.post(this.url + 'upload-img/'+ articleId,formData)
                                .then(res =>{
                                    if(res.data){
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        })
                                    }else{
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        })
                                    }
                                })
                    }
                }
                else {
                    this.setState({
                        status:'failet'
                    })
                }
            }).catch(err =>{
                this.setState({
                    article: false,
                    status: 'success'
                })
                console.log(err);
            })

    }else {
        this.validator.showMessages();
        this.forceUpdate();
        this.setState({
            article: false,
            status: 'failed'
        })
    }
        
}


  updateImg = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  render() {
    if (this.state.status === "success") {
      return <Redirect to={"/blog"}></Redirect>;

    }
    let article = this.state.article;
    return (
      <div>
        <div className="center" id="content">
          <h1 className="subheader"> Editar Articulo</h1>

          {this.state.article && (
            <form className="mid-form" onSubmit={this.saveArticle}>
              <div className="form-group">
                <label htmlFor="title">Titulo: </label>
                <input
                  type="text"
                  name="title"
                  placeholder="introduce un titulo ......"
                  defaultValue ={article.title}
                  ref={this.titleRef}
                  onChange={this.ChangeState}
                  required
                ></input>
                {this.validator.message(
                  "title",
                  this.state.article.title,
                  "required|alpha_num_space"
                )}
              </div>
              <div className="form-group">
                <label htmlFor="author">Autor: </label>
                <input
                  type="text"
                  name="author"
                  defaultValue ={article.author}
                  placeholder="introduce tu nombre....."
                  ref={this.authorRef}
                  onChange={this.ChangeState}
                  required
                ></input>
                {this.validator.message(
                  "author",
                  this.state.article.author,
                  "required|alpha_space"
                )}
              </div>
              <div className="form-group">
                <label htmlFor="content">Contenido: </label>
                <textarea
                  name="content"
                  defaultValue ={article.content}
                  placeholder="introduce el contenido...."
                  ref={this.contenRef}
                  onChange={this.ChangeState}
                  required
                ></textarea>
                {this.validator.message(
                  "content",
                  this.state.article.content,
                  "required"
                )}
              </div>
              <div className="form-group">
              <div className="image-wrap ">
              {
                            article.image !== null? (
                                <img src={this.url+"get_image/"+article.image} alt={article.title}  />
                            ): (
                                <img src={defaultImg} alt={article.title}  />
                            )
                        }
              </div>
                <label htmlFor="file0">seleciona la Imagen: </label>
                <input
                  type="file"
                  name="file0"
                  onChange={this.updateImg}
                ></input>
              </div>
              <input
                type="submit"
                value="Guardar"
                className="btn btn-success"
              ></input>
            </form>
          )}
          {(!this.state.article ||this.state.article=== null )&&
            <h1 className='subheader'>Cargando .......</h1>
          }
        </div>
        <Sidebar></Sidebar>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default EditArticle;
