import React, { Component } from 'react'
import axios from 'axios'

class OrderItem extends Component {
    state = {}

    constructor(props) {
        super(props)

        // Allow collapseField to use the state variable
        this.collapseField = this.collapseField.bind(this);
    }

    componentDidMount() {
        const orderItem = this.props.orderItem;
        axios.get('/api/v1/get_order_items?id=' + orderItem.id)
            .then(res => {
                this.setState({orderItem: orderItem, menuItem: res.data});
            })
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }


    collapseField(e) {
        let state = this.state;
        state.collapsed = !state.collapsed;
        this.setState(state)
    }

    render() {

        const orderItem = this.state.orderItem;
        const menuItems = this.state.menuItem;


        if(!menuItems || !orderItem)
            return (<p>Loading Data...</p>) 

        let body = (<tbody></tbody>)

        if(!this.state.collapsed) {
            body = (
                <tbody>
                { menuItems.map((item, index) => (
                    <tr key={index} className="h-10">
                        <td className="pl-8">
                            { item.name }
                        </td>
                     </tr>)
                )}
                </tbody>)
        }


        return (
            <table className="mb-4 table-fixed w-full text-white">
              <thead className="bg-gray-800">
                <tr className="h-20">
                  <th className="text-left">
                    <div className="ml-8 inline-block w-9/12">
                      <strong>Sted: {orderItem.location} - Bestilling: {orderItem.id}</strong>
                    </div>
                    <div className="inline-block">
                      <button onClick={this.collapseField} className="collapsible w-5 h-5"></button>
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
