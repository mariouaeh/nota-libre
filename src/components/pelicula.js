import React,{ Component } from "react";


class Pelicula extends Component {

marcadoFavorita = ()=>{
    this.props.favorita(this.props.pelicula);
}
    render(){
        const {titulo, image} = this.props.pelicula
        return(
            <article className="article-item">
                <div className="image-wrap">
                    <img src={image} alt= {titulo}></img>
                </div>
                    <h3>{titulo}</h3>
                    <button onClick = {this.marcadoFavorita}>añadir favorita</button>
                <div className="clearfix"></div>
            </article>
        )
    }
}

export default Pelicula;
