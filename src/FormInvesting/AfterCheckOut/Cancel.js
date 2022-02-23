import React from 'react'
import { motion } from "framer-motion"
import Bitcoin_Outline from '../../images/Bitcoin _Outline.svg'
import { Fade } from "react-awesome-reveal";
import SuccesImg from "../../images/SuccesImg.svg"
import "./Cancel.css"
function Cancel() {
  return (
    <div>
        <Fade>
        <div className="homeScreen__bottomm">
          <motion.div
            className="homeScreen__bottomLeftt">
            <h1>The payment was made successfully</h1>
            <p>
              The Starbucks Foundation awarded grants to over 400 nonprofits
              serving communities of color. Recipients were nominated by
              Starbucks partners (employees).
            </p>
            <p>Track your bet 👉 <a href=""> here</a> 👈</p>
            <button>Menu</button>
          </motion.div>
          <div className="homeScreen__bottomRight">

            <motion.img
              animate={{ y: 25}}
              initial={{ y: -30 }}
              transition={{ yoyo: Infinity, duration: 2 }}
             
              src={SuccesImg}
              alt="Image of bitcoin"
            />

          </div>
        </div>
      </Fade>

    </div>
  )
}

export default Cancel;