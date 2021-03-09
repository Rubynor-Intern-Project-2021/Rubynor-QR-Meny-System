import React from 'react'
import {useState} from 'react';
import PropTypes from 'prop-types';

const orderItem = ({menuItem, quantity}) => {


    orderItem.propTypes = {
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number
    }


    const [item, setItem] = useState(menuItem);
    const [name, setName] = useState(menuItem.name);
    const [num, setNum] = useState(quantity);
    const [price, setPrice] = useState(parseInt(menuItem.price));
    const [totalPrice, setTotalPrice] = useState(parseInt(menuItem.price * quantity));

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

    const handleChange = (event) => {
        setItem({
            ...item,
            quantity: event.target.value
        })

    }

    return (
        <div className="m-1 flex justify-between pt-4">
            <div className="flex justify-between">
                <div className="text-gray-800 ">
                    <div className="flex text-sm">
                        <button onClick={decNum} onChange={handleChange}>
                            &mdash;
                        </button>
                        <p className="px-3"> {num} </p>
                        <button onClick={incNum} onChange={handleChange}>
                            &#xff0b;
                        </button>
                    </div>
                </div>
                <div className="pl-7 text-gray-500">
                    {name}
                </div>
            </div>
            <div className="text-gray-700 ">
                {totalPrice},00 kr
            </div>
        </div>
    )
}

export default orderItem;

