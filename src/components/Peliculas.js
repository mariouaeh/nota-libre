import React,{ Component } from "react";
import Pelicula from "./pelicula";

class Peliculas extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }

    }


    canbiarTitulo = ()=>{
        let {peliculas}= this.state;
        let random = Math.floor(Math.random() * 3) 
        peliculas[random].titulo = "modificado";
        this.setState({
            peliculas : peliculas
            
        })
    }

    favorita = (pelicula)=>{
        console.log(pelicula);
        this.setState({
            favorita: pelicula
        })
        console.log(this.state.favorita);
    }
//aqui apenas se montara el componente se da valores al state
    componentWillMount(){
        this.setState({
            peliculas : [
                {titulo: 'King kong', image : 'https://r4.abcimg.es/resizer/resizer.php?imagen=https%3A%2F%2Fstatic3.abc.es%2Fmedia%2Fpeliculas%2F000%2F018%2F145%2Fking-kong-1.jpg&nuevoancho=690&medio=abc'},
                {titulo: 'Superma', image : 'https://pics.filmaffinity.com/Superman-376057457-large.jpg'},
                {titulo: 'Hulk', image : 'https://i.pinimg.com/originals/c7/52/56/c752565c3c0573a39009becf78f4dcc3.jpg'}

            ],
            favorita: {}
        })
    }

// aqui el componente ya se monto   
componentDidMount(){

}
// se desmonta el componente
componentWillUnmount(){

}
    render(){

        
        return(
            <div id="paliculas">
                <h2>Listado de peliculas</h2>
                <p>
                    <button onClick={this.canbiarTitulo}>Cambialo</button>
                </p>
                { this.state.favorita.titulo ? 
                    (
                    <div className='favorita'>
                        <span>tu pelicula favorita es: <strong>{this.state.favorita.titulo}</strong></span>
                    </div>) : 
                    (
                        <span>No hay pelicula favorita </span>
                    )
                }
                {this.state.peliculas.map((pelicula, i)=>{
                    return(
                        <Pelicula 
                        pelicula={pelicula}
                        key ={i}
                        favorita = {this.favorita}
                        ></Pelicula>
                        
                    )
                })}
            </div>
        )
    }
}

export default Peliculas