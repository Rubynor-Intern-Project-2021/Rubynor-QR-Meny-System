import React, { Component } from 'react'
import axios from 'axios'
import OrderItem from './order_item'


class OrderView extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        function refresh() {
            axios.get('/api/v1/get_orders?id=' + this.props.restaurantId) 
                .then(res => {
                    const orders = res.data
                    this.setState({orders});  
                });
        }
        refresh = refresh.bind(this);

        refresh();

        this.interval = setInterval(refresh, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
