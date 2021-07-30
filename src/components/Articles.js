import React,{ Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import defaultImg from "../assets/images/default2.jpg";
import Moment from "react-moment";
import 'moment/locale/es';

class Articles extends Component {
    url = Global.url;
    state = {
        articles: [],
        vacio: null
    }
    componentWillMount(){
        let home = this.props.home;
        let search = this.props.search;
        if(home === "true"){
            this.getLasArticles();
        }
        else if(search && search !== null && search !== undefined){
            this.getArticlesBySearch(search);
        }
        else 
        this.getArticles();
    }

    
    getArticlesBySearch = (search)=>{
        axios.get(this.url+"search/"+ search)
            .then(res =>{

                if(res.data.article){
                    this.setState({
                        artcles: res.data.article,
                        vacio: "no",
                        status: 'success'
                    })
                    console.log(this.state.artcle);
                }
                else {
                    this.setState({
                        artcles: res.data.article,
                        vacio: "si",
                        status: 'failed'
                    })
                }
               
            })
    }

    getLasArticles= ()=>{
        axios.get(this.url+"get_articles/last")
            .then(res =>{
                let vacio = "si";
                if(this.state.articles.length === 0){
                    vacio = "no";
                }
                this.setState({
                    artcles: res.data.articles,
                    vacio: vacio
                })
                console.log(this.state.artcles);
            })
    }
    getArticles = ()=>{
        axios.get(this.url+"get_articles")
            .then(res =>{
                let vacio = "si";
                if(this.state.articles.length === 0){
                    vacio = "no";
                }
                this.setState({
                    artcles: res.data.articles,
                    vacio: vacio
                })
                console.log(this.state.artcles);
            })
    }

    render()
    {
        if( this.state.vacio === "no"){

            let listaArticles = this.state.artcles.map((article)=>{
                return(
                    <article key={article._id} className="article-item " id ="article-template">
                    <div className="image-wrap">
                        {
                            article.image !== null? (
                                <img src={this.url+"get_image/"+article.image} alt={article.title} />
                            ): (
                                <img src={defaultImg} alt={article.title} />
                            )
                        }
                        
                    </div>
                    <h2 className="">{article.title}</h2>
                    <span className="date">
                        <Moment locale="es" fromNow>{article.date}</Moment>
                    </span>
                    <span className="date">by : {article.author}</span>
                    <Link to={"blog/article/"+article._id}> Leer más</Link>
                    <div className="clearfix"></div>
                </article>
                )
            })
            return(
                <div id='arcicles'>
                    {listaArticles}
                </div>
            )
        }else if( this.state.vacio === "si"){
            return(
                <div id='arcicles'>
                    <h2 className="subheader">No Hay articulos por mostrar :(</h2>
                    <p>Agrega un articulo para poder mostrarlo </p>
                </div>
                )
        }else{
            return(
                <div id='arcicles'>
                    <h2 className="subheader">Cargando ......</h2>
                    <p>Por favor espere miestras se carga el contenido  </p>
                </div>
            )
        }
    }
}

export default Articles;

