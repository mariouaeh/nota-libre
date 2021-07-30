import React, { Component } from 'react'


class PrimerComponente extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.state = {
            contador : 0
        }
    }

    sumar(){
        this.setState({
            contador : (this.state.contador +1)
        })
    }

    restar(){
            this.setState({
                contador : ( this.state.contador -1)
            })
    }

    render(){
        return(
            <div>
                <h2 className="subheader">Últimos artículos</h2>
                <section>
                    <h2>State</h2>
                    <p>
                        {this.state.contador}
                    </p>
                    <p>
                        {/* al usar el la palabra this , splo funciona con arrow function  */}
                        <button value="Sumar" onClick = {()=>this.sumar()}>Sumar </button>
                        <button  value="Restar" onClick = {()=>this.restar()}>Restar</button>
                    </p>
                </section>
            </div>
        )
    }
}

export default PrimerComponente
