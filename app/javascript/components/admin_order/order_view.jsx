import React, { Component } from 'react'
import axios from 'axios'
import OrderItem from './order_item'


class OrderView extends Component {
    state = {
        orders: []
    }

    constructor(props) {
        super(props)
        this.showNotFinished = this.showNotFinished.bind(this);
        this.showFinished = this.showFinished.bind(this);
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

    showNotFinished(e) {
        this.state.showFinished = false;
        this.setState(this.state);
    }

    showFinished(e) {
        this.state.showFinished = true;
        this.setState(this.state);
    }

    render() {
        let orders = [];

        this.state.orders.forEach(order => {
            if(this.state.showFinished && order.order_status == "Ferdig") {
                orders.push(order);
            }
            else if (!this.state.showFinished && order.order_status == "Startet") {
                orders.push(order);
            }
        });

        return (
            <div className="text-gray-200">
                <button className="pr-2" onClick={this.showNotFinished}>Ikke Fullført</button>|
                <button className="pl-2" onClick={this.showFinished}>Fullført</button>
                {orders.map((item, index) => 
                    <OrderItem key={item.id.toString() + ":" + index.toString()} orderItem={item}/>

                )}
            </div>
        );
    }
}

export default OrderView;
