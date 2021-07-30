import React,{ Component, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web'
import styles from "../css/text.css";

function Texspring(props) {
    const [state, toggle] = useState(true)
    const { x } = useSpring({
      from: { x: 0 },
      x: state ? 1 : 0,
      config: { duration: 1000 },
    })
    return (
      <div className={styles.container} onClick={() => toggle(!state)}>
        <animated.div
          className={styles.text}
          style={{
            opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
            scale: x.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}>
          <h1>{props.title}</h1>
        </animated.div>
      </div>
    )
  }
  
class Slider extends Component {

    render(){
        return(
            
        <div id="slider" className={this.props.size ?this.props.size : "slider-big"}>
            <Texspring title={this.props.title}></Texspring>{
                this.props.children && (
                <NavLink to="/blog"  className="btn-white">
                    <span className="inner">{this.props.children}</span>
                </NavLink>)
            }
            
        </div>
        )
    }
}

export default Slider;