import React, { Component } from 'react'
import axios from 'axios'
import {IoIosArrowForward, IoIosArrowDown} from "react-icons/io";

class Orders extends Component {
    state = {}

    constructor(props) {
        super(props)

        // Allow collapseField to use the state variable
        this.collapseField = this.collapseField.bind(this);
        this.finishOrder = this.finishOrder.bind(this);
        this.finishOrderItem = this.finishOrderItem.bind(this);
    }

    componentDidMount() {
        this.state.order = this.props.order;
        this.state.collapsed = true;
        this.setState(this.state)

        function refresh() {
            axios.get('/api/v1/get_order_items?id=' + this.props.order.id).then(res => {
                let state = this.state;
                state.orderItems = res.data;
                this.setState(state)
            });
        }

        refresh = refresh.bind(this);

        refresh();

        this.interval = setInterval(refresh, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    collapseField(e) {
        let state = this.state;
        state.collapsed = !state.collapsed;
        this.setState(state)
    }

    finishOrder(e) {
        axios.get("/api/v1/finish_order?id=" + this.state.order.id).then(res => {

        });
    }

    finishOrderItem(e) {
        axios.get("/api/v1/finish_order_item?id=" + this.state.orderItem.id).then(res => {

        });
    }

    render() {
        if(!this.state.order)
            return <p>Waiting for order items</p>

        const order = this.state.order;

        const orderItems = this.state.orderItems;

        if(!orderItems)
            return <p>Loading..</p>

        let body = (<tbody></tbody>)
        let collapseButton = <IoIosArrowForward/>

        let finishBtn = <p></p>
        if(order.orders_status == "Startet") {
            finishBtn = (<div className="inline-block float-right pr-10">
                <button onClick={this.finishOrder}>Fullfør</button>
            </div>)
        }

        if(!this.state.collapsed) {
            body = (
                <tbody>
                { orderItems.map((item, index) => (
                    <tr key={index} className="admin-content-row">
                        <td className="pl-8">
                            <div className="inline-block">
                                {item.number} { item.name } x{item.quantity}
                            </div>
                            <div className="inline-block float-right pr-10">
                                {item.total_price},-
                            </div>
                        </td>
                    </tr>)
                )}
                <tr className="h-8">
                    <td className="pl-8">
                        Kommentar: { order.customer_info }
                    </td>
                </tr>
                </tbody>)

            collapseButton = <IoIosArrowDown/>
        }

        return (
            <table className="mb-4 admin-title-row">
                <thead className="">
                <tr className="admin-tbl-border">
                    <th className="text-left">
                        <div className="ml-8 inline-block pr-5">
                            <strong>Sted: {order.location} - Bestilling: {order.id}</strong>
                        </div>
                        <div className="inline-block">
                            {order.created_at}
                        </div>
                        <div className="inline-block float-right pr-10">
                            <button onClick={this.collapseField} className="collapsible w-5 h-5">{collapseButton}</button>
                        </div>

                        {finishBtn}

                    </th>
                </tr>
                </thead>
                {body}
            </table>
        )
    }
}


export default Orders;
