import React, { Component } from 'react'
import axios from 'axios'
import OrderItem from './order_item'


class OrderView extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            axios.get('/api/v1/get_orders?id=' + this.props.restaurantId) 
                .then(res => {
                    const orders = res.data
                    this.setState({orders});  
                })
            }, 1000);
    }

    render() {
        if(this.state.orders.length == 0)
            return (<p className="text-gray-200">Waiting for orders...</p>)

        return this.state.orders.map((item, index) => 
            <OrderItem key={index} orderItem={item}/>
        );
    }
}

export default OrderView;
