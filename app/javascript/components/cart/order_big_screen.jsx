import React, { useState } from 'react';
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";

export default function OrderBigScreen({ menuItem, quantity }) {

    OrderBigScreen.propTypes = {
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number
    }

    const [zero, setZero] = useState(false)
    const [item, setItem] = useState(menuItem);
    const [name, setName] = useState(menuItem.name);
    const [amount, setAmount] = useState(quantity);
    const [price, setPrice] = useState(parseInt(menuItem.price));
    const [totalPrice, setTotalPrice] = useState(parseInt(menuItem.price * quantity));


    //react spring -> animasjon
    const slide = useSpring({
        marginLeft: zero ? -80 : 0,
        marginRight: zero ? 80 : 0,
        from: {
            marginLeft: 0,
            marginRight: 0
        }
    });


    const total_price = (val) => {
        setTotalPrice(price * val);
    }

    const incNum = () => {
        setZero(false)
        setAmount(amount + 1);
        total_price(amount + 1)

    }

    const decNum = () => {
        setZero(false)
        if (amount > 1) {
            setAmount(amount - 1);
            total_price(amount - 1)
        } else {
            setAmount(0);
            total_price(0)
            setZero(true)
        }
    }

    const handleChange = (event) => {
        setItem({
            ...item,
            quantity: event.target.value
        })
    }

    return (
        <div className="flex justify-between z-10 relative">
            <div className="pl-8 py-1.5">

                <div className="flex justify-between">
                    <div className="text-gray-800 ">
                        <div className="flex ">
                            <button onClick={decNum} onChange={handleChange} className="text-green-400 ">
                                &mdash;
                            </button>
                            <p className="px-3"> {amount} </p>
                            <button onClick={incNum} onChange={handleChange} className="text-green-400 ">
                                &#xff0b;
                            </button>
                        </div>
                    </div>
                    <div className="pl-7 text-gray-500">
                        {name}
                    </div>
                </div>
            </div>
            <div>
                <animated.div style={slide} className="pr-8 py-1.5 text-gray-700 bg-white">
                    {totalPrice},00 NOK
                </animated.div>
            </div>
        </div>
    )
}

