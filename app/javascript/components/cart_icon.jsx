import React from 'react'
import {useState} from 'react';
import { RiShoppingBag2Line } from 'react-icons/ri';
import { BsFillCircleFill } from 'react-icons/bs';


const cartIcon = () => {
    const [amount, setAmount] = useState(4)

    return (
        <div className="relative">
            <div className="text-green-300">
                <RiShoppingBag2Line size={25}/>
            </div>
            <div className="text-green-300 absolute top-3 -right-0.5">
                <BsFillCircleFill />
            </div>
            <div className="text-xs text-white absolute top-3 right-0.5">
                {amount}
            </div>
        </div>

    )

}

export default cartIcon;