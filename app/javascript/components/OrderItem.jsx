import React from 'react'
import {useState} from 'react';
import PropTypes from "prop-types";

const OrderItem = ({menuItem}) => {

    OrderItem.defaultProps = {
        quantity: 1
    }

    OrderItem.propTypes = {
        quantity: PropTypes.int
    }

    const [item, setItem] = useState(menuItem);

    const [num, setNum] = useState(menuItem.quantity);

    const incNum = () => {
        setNum(num+1);
    }

    const decNum = () => {
        if(num > 0) {
            setNum(num - 1);
        }
        else{
            setNum(0);
        }
    }

    const handleChange = (event) => {
        setItem({
            ...item,
            quantity:event.target.value
        })
    }

    return(
        <div>
            <div className="quantity-input">
                <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decNum} onChange={handleChange}>
                    &mdash;
                </button>
                <p className="quantity-input__screen"> {num} </p>
                <button className="quantity-input__modifier quantity-input__modifier--right" onClick={incNum} onChange={handleChange}>
                    &#xff0b;
                </button>
            </div>
        </div>
    )
}

export default OrderItem;

