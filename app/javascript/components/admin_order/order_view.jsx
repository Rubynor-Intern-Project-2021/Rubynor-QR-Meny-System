import React, { Component } from 'react'
import axios from 'axios'
import Order from './order'


class OrderView extends Component {
    state = {
        orders: []
    }

    constructor(props) {
        super(props)
        this.showNotFinished = this.showNotFinished.bind(this);
        this.showFinished = this.showFinished.bind(this);
        this.showPaid = this.showPaid.bind(this);
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

        this.showNotFinished()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    showNotFinished() {
        this.state.showNotFinished = true;
        this.state.showFinished = false;
        this.state.showPaid = false;

        this.setState(this.state);
    }

    showFinished() {
        this.state.showNotFinished = false;
        this.state.showFinished = true;
        this.state.showPaid = false;
        this.setState(this.state);
    }

    showPaid() {
        this.state.showNotFinished = false;
        this.state.showFinished = false;
        this.state.showPaid = true;
        this.setState(this.state);
    }

    render() {
        let orders = [];

        this.state.orders.forEach(order => {
            if(this.state.showFinished && order.order_status === "Ferdig") {
                orders.push(order);
            }
            else if (this.state.showNotFinished && order.order_status === "Startet") {
                orders.push(order);
            }
            else if (this.state.showPaid && order.order_status === "Betalt") {
                orders.push(order);
            }
        });

        if(this.state.showFinished) {
            orders.sort(function(a, b) { 
                var nameA = a.location;
                var nameB = b.location;
                if (nameA.length < nameB.length)
                {
                    return -1;
                }
                if (nameA.length > nameB.length)
                {
                    return 1;
                }
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        }

        return (
            <div className="text-gray-200">
                <button className="pr-2" onClick={this.showNotFinished}>Ikke Fullført</button>|
                <button className="pl-2" onClick={this.showFinished}>Fullført</button> |
                <button className="pl-2" onClick={this.showPaid}>Betalt</button>
                {orders.map((order, index) =>
                    <Order key={order.id.toString()} order={order}/>
                )}
            </div>
        );
    }
}

export default OrderView;
