import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHanlder';

export class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get("/orders.json")
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
            });
    }
    
    render() {
        return (
            <div>
               {this.state.orders.map(order => (
                   <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
               ))}
            </div>
        )
    }
}

export default withErrorHanlder(Orders, axios)
