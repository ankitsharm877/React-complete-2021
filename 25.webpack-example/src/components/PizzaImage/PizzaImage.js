import React from 'react'
import classes from './PizzaImage.css'
import img from '../../assets/pizza.jpg'

const PizzaImage = () => {
    return (
        <div className={classes.PizzaImage}>
            <img src={img} className={classes.PizzaImg}/>
        </div>
    )
}

export default PizzaImage
