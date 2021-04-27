import React from 'react'
import { useState } from 'react';
import { BsBag } from 'react-icons/bs';
import axios from "axios";
import { useEffect } from 'react';
import { storeIcon } from '../configureStore'


const cartIcon = () => {
    const [amount, setAmount] = useState('')

    storeIcon.subscribe(() => {
        setAmount(storeIcon.getState())
    });

    function GetAmount() {
        axios.get('/api/v1/total_amount')
            .then(response => {
                console.log(response.data)
                setAmount(response.data)
            }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() =>{
        GetAmount()
    }, [])

    return (
        <div className="relative">
            <div className="text-pink-700 lg:text-gray-100">
                <BsBag size={28}/>
            </div>
            <div className="text-xs font-bold absolute top-2.5 right-2.5 lg:text-gray-900">
                {amount}
            </div>
        </div>
    )
}

export default cartIcon;
