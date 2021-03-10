import React from 'react'
import {useState} from 'react';
import PropTypes from 'prop-types';
import {useSpring, animated} from 'react-spring'
import { HiOutlineTrash } from 'react-icons/hi';

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
        setNum(num + 1);
        total_price(num + 1)

    }

    const decNum = () => {
        setZero(false)
        if (num > 1) {
            setNum(num - 1);
            total_price(num - 1)
        } else {
            setNum(0);
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

    const smallScreen = () => {
        return (
            <animated.div style={slide} className="px-8 py-2 my-0.5 flex bg-white justify-between z-10 relative">
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
                    <div className="pl-7 text-gray-500" >
                        {name}
                    </div>
                </div>
                <div className="text-gray-700 ">
                    {totalPrice},00 NOK
                </div>
            </animated.div>
        )
    }

    const bigScreen = () => {
        return (
            <div className="flex justify-between z-10 relative">
                <div className="pl-8 py-2">

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
                    <div className="pl-7 text-gray-500">
                        {name}
                    </div>
                </div>
                </div>
                <div>
                <animated.div style={slide} className="pr-8 py-2 text-gray-700 bg-white">
                    {totalPrice},00 NOK
                </animated.div>
            </div>
            </div>
        )
    }

    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;

    return (
        <div className="relative ">
            {mobileView ? smallScreen() : bigScreen()}
            <button id="delete" className="text-white text-lg w-20 bg-green-300 py-2 pl-8 absolute top-0 right-0 ">
                <HiOutlineTrash />
            </button>

        </div>
    )
}

export default orderItem;

