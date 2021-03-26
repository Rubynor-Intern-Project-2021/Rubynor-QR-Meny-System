import React, {useReducer} from 'react'
import {useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {store} from './configureStore'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';



const addToCart = ({menuItem}) => {

    addToCart.propTypes = {
        price: PropTypes.number
    }

    const [item, setItem] = useState(menuItem);
    const [num, setNum] = useState(1);
    const [price, setPrice] = useState(parseInt(menuItem.price));
    const [totalPrice, setTotalPrice] = useState(parseInt(menuItem.price * 0));


    const total_price = (val) => {
        setTotalPrice(price * val);
    }

    const incNum = () => {
        setNum(num + 1);
        total_price(num + 1)
    }

    const decNum = () => {
        if (num > 0) {
            setNum(num - 1);
            total_price(num - 1)
        } else {
            setNum(0);
        }
    }
    
    function addMultipleToCart() {
        console.log("TEEST"+menuItem.id)
        axios.get('/api/v1/add_to_cart',
            {
            params: {menu_item_id: menuItem.id, amount: num}})
            .then(response => {

                axios.get('/api/v1/total_amount').then(res => {
                    store.dispatch({
                        type: 'UPDATE_ICON',
                        payload: res.data
                    });
                }); 

                setNum(0)
            }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="flex justify-between py-2">
            <div className="flex justify-between py-2">
                <div className="text-gray-800 ">
                    <div className="flex text-sm">
                        <button onClick={decNum} >
                            <AiOutlineMinus/>
                        </button>
                        <p className="px-5"> {num} </p>
                        <button onClick={incNum} >
                            <AiOutlinePlus/>
                        </button>
                    </div>
                </div>
            </div>

            <div >
                <button onClick={addMultipleToCart} className="text-xs text-white bg-gray-700 uppercase bg-white px-10 py-2">Legg i kurv</button>
            </div>
        </div>
    )
}

export default addToCart;

