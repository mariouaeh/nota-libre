import React,{Component  } from "react";
import {  Redirect} from "react-router-dom";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import alert from 'sweetalert';
import Global from "../Global";
import Sidebar from "./Sidebar";

class CreateArticle extends Component {

    titleRef =React.createRef();
    contenRef = React.createRef();
    authorRef = React.createRef();
    url = Global.url;
    state = {
        article: {},
        status: null,
        selectedFile : null
    }

    constructor(props) {
        super(props);
        // Se carga el objeto para validar el formulario
        // En el curso utiliza el componentWillMount

        this.validator = new SimpleReactValidator({locales: 'es'});
    }


    ChangeState =()=>{

            this.setState({
                article: {
                    title: this.titleRef.current.value,
                    content: this.contenRef.current.value,
                    author: this.authorRef.current.value
                }
            })
            console.log(this.state);
      
            this.validator.showMessages();
            this.forceUpdate();
    }

    saveArticle = (e)=>{
        
        if (this.validator.allValid()){
            e.preventDefault();
            this.ChangeState();
            axios.post(this.url+"save",this.state.article)
                .then(res =>{
                    if(res.data){
                        this.setState({
                            article: res.data.articleStored,
                            status: 'success'
                        })

                        alert('Articulo creado ',
                            'El articulo fue exitosamente creado ....',
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
                            status: 'failed'
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

    updateImg = (e)=>{
        this.setState({
            selectedFile : e.target.files[0]
        })

    }

    
    render(){

        if(this.state.status ==='success'){
            return <Redirect to={"/blog"}></Redirect>;
        }
        return(
            <div>
                <div className="center" id="content">
                    <h1 className="subheader"> Crear Nuevo Articulo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo: </label>
                            <input type="text" name="title" placeholder="introduce un titulo ......" ref={this.titleRef} onChange={this.ChangeState} required></input>
                                {this.validator.message('title',this.state.article.title,'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Autor: </label>
                            <input type="text" name="author" placeholder="introduce tu nombre....." ref={this.authorRef} onChange={this.ChangeState} required></input>
                            {this.validator.message('author',this.state.article.author,'required|alpha_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido: </label>
                            <textarea name="content"   placeholder="introduce el contenido...." ref={this.contenRef} onChange={this.ChangeState} required></textarea>
                            {this.validator.message('content',this.state.article.content,'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">seleciona la Imagen: </label>
                            <input type="file" name="file0" onChange={this.updateImg}></input>
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success"></input>
                    </form>
                </div>
                <Sidebar></Sidebar>
                <div className="clearfix"></div>
            </div>
        )
    }
}

export default CreateArticle