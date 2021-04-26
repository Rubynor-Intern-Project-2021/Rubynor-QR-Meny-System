import React, { Component } from 'react'
import axios from 'axios'
import {IoIosArrowForward, IoIosArrowDown} from "react-icons/io";

class Order extends Component {
    state = {}

    constructor(props) {
        super(props)

        // Allow collapseField to use the state variable
        this.collapseField = this.collapseField.bind(this);
        this.orderFinish = this.orderFinish.bind(this)
        this.orderPaid = this.orderPaid.bind(this)
        this.changeOrderItem = this.changeOrderItem.bind(this)
        this.state = {
            unchecked: false
        }
        this.state = {
            checked: true
        }
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

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    collapseField(e) {
        let state = this.state;
        state.collapsed = !state.collapsed;
        this.setState(state)
    }

    orderFinish(e) {
        axios.get("/api/v1/set_order_finish?id=" + this.state.order.id);
    }

    orderPaid(e) {
        axios.get("/api/v1/set_order_paid?id=" + this.state.order.id);
    }

    changeOrderItem(itemId) {
        axios.get("/api/v1/change_order_item_status?id=" + itemId);
    }

    handleChange = (itemId, e) => {
        const { unchecked } = e.target
        this.setState({
            checked: unchecked
        })
        this.changeOrderItem(itemId)
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
        if(order.order_status === "Startet") {
            finishBtn = (<div className="inline-block float-right pr-10">
                            <button onClick={this.orderFinish}>Fullfør</button>
                        </div>)
        }

        if(order.order_status === "Ferdig") {
            finishBtn = (<div className="inline-block float-right pr-10">
                <button onClick={this.orderPaid}>Betalt</button>
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
                            <div className="flex inline-block float-right pr-10">
                                { order.order_status === "Startet" &&
                                <>
                                    {item.order_item_status === "Startet" ?
                                    <label className="inline-flex ">
                                        <input type="checkbox"
                                               onChange={e => this.handleChange(item.id, e)}
                                               defaultChecked={this.state.unchecked}
                                               className="form-checkbox h-5 w-5 text-gray-600"/>
                                            <span className="ml-2 text-gray-700">Fullført
                                            </span>
                                    </label> :
                                    <label className="inline-flex ">
                                        <input type="checkbox"
                                               onChange={e => this.handleChange(item.id, e)}
                                               defaultChecked={this.state.checked}
                                               className="form-checkbox h-5 w-5 text-gray-600 "/>
                                        <span className="ml-2 text-gray-700">Fullført
                                        </span>
                                    </label>
                                    }
                                </>
                                }
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


export default Order;
