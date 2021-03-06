import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHanlder';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

export class Orders extends Component {
  /*   state = {
        orders: [],
        loading: true
    } */
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
        /* axios.get("/orders.json")
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(error => {
                this.setState({loading: false});
            }); */
    }
    
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))
        } 
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatach => {
    return {
        onFetchOrders: (token, userId) => dispatach(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHanlder(Orders, axios))
