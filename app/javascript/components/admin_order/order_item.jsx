import React, { Component } from 'react'
import axios from 'axios'
import {IoIosArrowForward, IoIosArrowDown} from "react-icons/io";

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
        let collapseButton = <IoIosArrowForward/>

        let finishBtn = <p></p>
        if(orderItem.order_status == "Startet") {
            finishBtn = (<div className="inline-block float-right pr-10">
                            <button onClick={this.finishOrder}>Fullfør</button>
                        </div>)
        }

        if(!this.state.collapsed) {
            body = (
                <tbody>
                { menuItems.map((item, index) => (
                    <tr key={index} className="h-10 bg-gray-100 border-b border-gray-200">
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
                        Kommentar: { orderItem.customer_info }
                    </td>
                </tr>
                </tbody>)

            collapseButton = <IoIosArrowDown/>
        }

        return (
            <table className="mb-4 table-fixed w-full bg-gray-200 text-gray-800 tracking-wide">
              <thead className="">
                <tr className="h-16 border-b-2 border-gray-300">
                  <th className="text-left">
                    <div className="ml-8 inline-block pr-5">
                      <strong>Sted: {orderItem.location} - Bestilling: {orderItem.id}</strong>
                    </div>
                    <div className="inline-block">
                        {orderItem.created_at}
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


export default OrderItem;
