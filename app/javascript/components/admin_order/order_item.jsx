import React, { Component } from 'react'
import axios from 'axios'

class OrderItem extends Component {
    state = {}

    componentDidMount() {
        const orderItem = this.props.orderItem;
        axios.get('/api/v1/get_order_menu_item?id=' + orderItem.id)
            .then(res => {
                this.setState({orderItem: orderItem, menuItem: res.data});
            })
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }


    render() {
        const orderItem = this.state.orderItem;
        const menuItem = this.state.menuItem;

        if(!menuItem || !orderItem)
            return (<p>Loading Data...</p>) 

        function collapseField() {

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
                      <button onClick={collapseField} className="collapsible w-5 h-5"></button>
                    </div>
                  </th>
                </tr>
              </thead>
                <tbody>
                  <tr className="h-10">
                    <td className="pl-8">
                      {menuItem.name}              
                    </td>
                  </tr>
              </tbody>
            </table>
        )
    }
    
}


export default OrderItem;
