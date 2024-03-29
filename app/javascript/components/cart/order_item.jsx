import React from 'react'
import {useState} from 'react';
import PropTypes from 'prop-types';
import {useSpring, animated} from 'react-spring'
import {HiOutlineTrash} from 'react-icons/hi'
import axios from "axios";
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";


const OrderItem = ({orderItem, quantity, handleRemoveOrder}) => {

    OrderItem.propTypes = {
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number
    }
    const [show, setShow] = useState(false)
    const [zero, setZero] = useState(false)
    const [item, setItem] = useState(orderItem);
    const [name, setName] = useState(orderItem.name);
    const [num, setNum] = useState(quantity);
    const [price, setPrice] = useState(parseInt(orderItem.price));
    const [totalPrice, setTotalPrice] = useState(parseInt(orderItem.price * quantity));

    //react spring -> animasjon
    const slide = useSpring({
        marginLeft: zero ? -80 : 0,
        marginRight: zero ? 80 : 0,
        from: {
            marginLeft: 0,
            marginRight: 0
        }
    });

    function addOne() {
        axios.get('/api/v1/add_one_to_cart/',
            {
                params: {menu_item_id: orderItem.id}
            })
            .then(response => {
                console.log(response.data)
            }).catch(error => {
            console.log(error);
        })
    }

    function removeOne() {
        axios.get('/api/v1/remove_one_from_cart',
            {
                params: {menu_item_id: orderItem.id}
            })
            .then(response => {
                console.log(response.data)
            }).catch(error => {
            console.log(error);
        })
    }

    function removeAll() {
        axios.get('/api/v1/remove_all_from_cart',
            {
                params: {menu_item_id: orderItem.id}
            })
            .then(response => {
                console.log(response.data)
            }).catch(error => {
            console.log(error);
        })
    }


    const total_price = (val) => {
        setTotalPrice(price * val);
    }

    const incNum = () => {
        setZero(false)
        setNum(num + 1);
        total_price(num + 1)
        addOne()
    }

    const decNum = () => {

        if (num > 1) {
            setZero(false)
            setNum(num - 1);
            total_price(num - 1);
            removeOne();
        } else {
            setNum(0);
            total_price(0);
            setZero(true);
        }
    }

    const handleChange = (event) => {
        setItem({
            ...item,
            quantity: event.target.value
        })

    }

    const truncateString = (str, num) => {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str
      }
      // Return str truncated with '...' concatenated to the end of str.
      return str.slice(0, num) + '...'
    }

    const smallScreen = () => {
        return (
            <animated.div style={slide} className="pl-8 pr-2 py-2 my-0.5 flex bg-white justify-between z-6 relative">
                <div className="flex justify-between">
                    <div className="text-gray-800 ">
                        <div className="flex ">
                            <button onClick={decNum} onChange={handleChange} className="">
                                <AiOutlineMinus/>
                            </button>
                            <p className="px-4 text-sm"> {num} </p>
                            <button onClick={incNum} onChange={handleChange} className="">
                                <AiOutlinePlus/>
                            </button>
                        </div>
                    </div>
                    <div className="text-sm pl-7 text-gray-500">
                        {truncateString(name, 16)}
                    </div>
                </div>
                <div className="text-sm text-gray-700 ">
                    {totalPrice} kr
                </div>
            </animated.div>
        )
    }

    const bigScreen = () => {
        return (
            <div className="flex justify-between z-0 relative">
                <div className="pl-8 py-2">

                    <div className="flex justify-between">
                        <div className="text-gray-800 ">
                            <div className="flex ">
                                <button onClick={decNum} onChange={handleChange} className="">
                                    <AiOutlineMinus/>
                                </button>
                                <p className="px-5"> {num} </p>
                                <button onClick={incNum} onChange={handleChange} className="">
                                    <AiOutlinePlus/>
                                </button>
                            </div>
                        </div>
                        <div className="text-md pl-7 text-gray-500">
                            {name}
                        </div>
                    </div>
                </div>
                <div>
                    <animated.div style={slide} className=" text-md pl-10 py-2 text-gray-700 bg-white">
                        {totalPrice} kr
                    </animated.div>
                </div>
            </div>
        )
    }

    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;

    return (
        <div className="relative ">
            <div className="mr-8">
                {mobileView ? smallScreen() : bigScreen()}

            </div>

            <div>
                <button style={{zIndex: zero ? 10 : -1}} onClick={() => {removeAll(); handleRemoveOrder(orderItem);}} id="delete"
                                  className="text-white text-lg w-20 bg-red-300 py-2 pl-8 hover:bg-blue-300 absolute top-0 right-0 ">
                    <HiOutlineTrash/>
                </button>
            </div>

        </div>
    )
}

export default OrderItem;

