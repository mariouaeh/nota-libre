import React,{Component  } from "react";
import { NavLink } from "react-router-dom";

import  logo  from "../assets/images/react.svg";
class Header extends Component {
    render(){
        return(
            <header id="header">
            <div className="center">
                {/* <!-- LOGO -->*/}
                <div id="logo">
                    <img src={logo} className="app-logo" alt="Logotipo" />
                    <span id="brand">
                        <strong>Nota-</strong>Libre
                    </span>
                </div>
                
                {/* MENU -->*/}
                <nav id="menu">
                    <ul>
                        <li>
                            <NavLink to="/home" activeClassName="active">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/formulario">Formulario</NavLink>
                        </li>
                        <li>
                            <NavLink to="/prueba3">Paguina 1</NavLink>
                        </li>                         
                    </ul>
                </nav>

                {//--LIMPIAR FLOTADOS--}
                }
                <div className="clearfix"></div>
            </div>
        </header>
        )
    }
}

export default Header;