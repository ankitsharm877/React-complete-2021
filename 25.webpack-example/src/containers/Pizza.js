import React, { Component } from 'react'
import PizzaImage from '../components/PizzaImage/PizzaImage'

export class Pizza extends Component {
    render() {
        return (
            <div>
                <h1>THe Pizza</h1>
                <PizzaImage/>
            </div>
        )
    }
}

export default Pizza
