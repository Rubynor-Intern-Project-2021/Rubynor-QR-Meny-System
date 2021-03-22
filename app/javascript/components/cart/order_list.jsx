import React, {useState, useEffect, useReducer} from 'react'
import PropTypes from 'prop-types';
import OrderItem from "./order_item";
import {orderListReducer, store} from '../configureStore'


const OrderList = ({orderItems}) => {

    OrderList.propTypes = {
        orderItems: PropTypes.object
    }

    const [orders, dispatchOrders] = useReducer(
        orderListReducer,
        []
    );


    const getCoursesAsync = () =>
        new Promise(resolve => resolve({orders: orderItems})
        );

    useEffect(() => {

        getCoursesAsync().then(result => {
            dispatchOrders({
                type: 'SET_ORDERS',
                payload: result.orders
            });
        })
    }, []);

    const handleRemoveOrder = order => {
        dispatchOrders({
            type: 'REMOVE_ORDER',
            payload: order
        });
    }

    return (
        <div className=" ">
            {
                Object.entries(orders).map(([key, value]) => {
                    return (<div key={JSON.parse(key).id}>
                        <OrderItem orderItem={JSON.parse(key)} quantity={value} handleRemoveOrder={handleRemoveOrder}/>
                    </div>);

                })
            }

        </div>
    )
}

export default OrderList;

