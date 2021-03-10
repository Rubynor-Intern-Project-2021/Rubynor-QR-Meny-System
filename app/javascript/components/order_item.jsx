import React from 'react'
import {useState} from 'react';
import PropTypes from 'prop-types';
import {useSpring, animated} from 'react-spring'

const orderItem = ({menuItem, quantity}) => {

    orderItem.propTypes = {
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number
    }

    const [zero, setZero] = useState(false)
    const [item, setItem] = useState(menuItem);
    const [name, setName] = useState(menuItem.name);
    const [num, setNum] = useState(quantity);
    const [price, setPrice] = useState(parseInt(menuItem.price));
    const [totalPrice, setTotalPrice] = useState(parseInt(menuItem.price * quantity));



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
        setNum(num + 1);
        total_price(num + 1)

    }

    const decNum = () => {
        if (num > 1) {
            setNum(num - 1);
            total_price(num - 1)
        } else {
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
        <div className="relative ">
            <animated.div style={slide} className="px-8 py-1.5 my-0.5 flex bg-white justify-between z-10 relative" >
                <div className="flex justify-between">
                    <div className="text-gray-800 ">
                        <div className="flex ">
                            <button onClick={decNum} onChange={handleChange} className="text-green-400 ">
                                &mdash;
                            </button>
                            <p className="px-3"> {num} </p>
                            <button onClick={incNum} onChange={handleChange} className="text-green-400 ">
                                &#xff0b;
                            </button>
                        </div>
                    </div>
                    <div className="pl-7 text-gray-500" onClick={() => setZero(!zero)}>
                        {name}
                    </div>
                </div>
                <div className="text-gray-700 ">
                    {totalPrice},00 NOK
                </div>
            </animated.div>
            <button id="delete" className="w-20 bg-green-300 py-1.5 absolute top-0 right-0 ">
                Slett
            </button>
        </div>
    )
}

export default orderItem;

