import React from 'react'
import {useState} from 'react';
import PropTypes from 'prop-types';

const addToCart = ({menuItem}) => {


    addToCart.propTypes = {
        price: PropTypes.number
    }

    const [item, setItem] = useState(menuItem);
    const [num, setNum] = useState(0);
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



    return (
        <div className="m-1 flex justify-between pt-4">
            <div className="flex justify-between">
                <div className="text-gray-800 ">
                    <div className="flex text-sm">
                        <button onClick={decNum} >
                            &mdash;
                        </button>
                        <p className="px-3"> {num} </p>
                        <button onClick={incNum} >
                            &#xff0b;
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-gray-700 ">
                {totalPrice},00 kr
            </div>
            <div>  </div>

        </div>
    )
}

export default addToCart;

