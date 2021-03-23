import React, { Component } from 'react'
import axios from 'axios'
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

class OrderItem extends Component {
    state = {}

    constructor(props) {
        super(props)

        // Allow collapseField to use the state variable
        this.collapseField = this.collapseField.bind(this);
        this.finishOrder = this.finishOrder.bind(this);
    }

    componentDidMount() {
        this.state.orderItem = this.props.orderItem;
        this.state.collapsed = true;
        this.setState(this.state)

        function refresh() {
            axios.get('/api/v1/get_order_items?id=' + this.props.orderItem.id).then(res => {
                    let state = this.state;
                    state.menuItems = res.data;
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
        axios.get("/api/v1/finish_order?id=" + this.state.orderItem.id).then(res => {
            
        });
    }

    render() {
        if(!this.state.orderItem)
            return <p>Waiting for order items</p>

        const orderItem = this.state.orderItem;

        const menuItems = this.state.menuItems;
        
        if(!menuItems)
            return <p>Loading..</p>

        let body = (<tbody></tbody>)
        let collapseButton = <FaArrowRight/>

        if(!this.state.collapsed) {
            body = (
                <tbody>
                { menuItems.map((item, index) => (
                    <tr key={index} className="h-10">
                        <td className="pl-8">
                            <div className="inline-block">
                                { item.name } x{item.quantity}
                            </div>
                            <div className="inline-block float-right pr-10">
                                {item.total_price},-
                            </div>
                        </td>
                     </tr>)
                )}
                <tr className="h-10">
                    <td className="pl-8">
                        Kommentar: { orderItem.customer_info }
                    </td>
                </tr>
                </tbody>)

            collapseButton = <FaArrowDown/>
        }

        return (
            <table className="mb-4 table-fixed w-full text-white">
              <thead className="bg-gray-800">
                <tr className="h-20">
                  <th className="text-left">
                    <div className="ml-8 inline-block w-9/12">
                      <strong>Sted: {orderItem.location} - Bestilling: {orderItem.id}</strong>
                    </div>
                    <div className="inline-block float-right pr-10">
                      <button onClick={this.collapseField} className="collapsible w-5 h-5">{collapseButton}</button>
                    </div>

                    <div className="inline-block float-right pr-10">
                      <button onClick={this.finishOrder}>Fullfør</button>
                    </div>
                  </th>
                </tr>
              </thead>
                {body}
            </table>
        )
    }
    
}


export default OrderItem;
