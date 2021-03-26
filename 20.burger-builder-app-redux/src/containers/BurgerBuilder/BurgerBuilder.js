import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHanlder'
import axios from '../../axios-order';

/* const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}; */

class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           /*   ingredients: null, */
             /* totalPrice: 4, */
             /* purchasable: false, */
             purchasing: false,
             loading: false,
             error: false
        }
    }
    
    componentDidMount() {
        console.log(this.props);
       /*  axios.get("https://react-burger-builder-e2537-default-rtdb.firebaseio.com/ingredients.json")
            .then(res => {
                this.setState({ingredients: res.data});
            })
            .catch(error => {
                this.setState({error: true});
            });  */
    }
    

    updatePurchaseState(updatedIngredient) {
        const ingredients = {
            ...updatedIngredient
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    /* addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;

        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    } */

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        /* let queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        
        queryParams.push("price=" + this.state.totalPrice);

        const queryString = queryParams.join('&'); */
        this.props.history.push('/checkout');
       /*  this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        }); */
       //alert('You continue!');
      
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}/>
                </Aux>
            )
            orderSummary = (<OrderSummary ingredients={this.props.ings}
                price={this.props.price}
                purchasedCancel={this.purchaseCancelHandler}
                purchasedContinued={this.purchaseContinueHandler}/>);
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
      ings: state.ingredients,
      price: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientname:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientname: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuilder, axios));
