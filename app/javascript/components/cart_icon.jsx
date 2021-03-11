import React from 'react'
import {useState} from 'react';
import { RiShoppingBag2Line } from 'react-icons/ri';
import { BsFillCircleFill } from 'react-icons/bs';
import axios from "axios";
import {useEffect} from 'react';
import { createStore } from 'redux';
import {inc, dec, store} from './configureStore'


const cartIcon = () => {
    const [amount, setAmount] = useState('')

    store.subscribe(() => {
        console.log(store.getState())
        setAmount(store.getState())
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