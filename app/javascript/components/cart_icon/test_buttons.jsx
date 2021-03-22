import React from 'react'
import {useState} from 'react';
import {inc, dec, store} from '../configureStore'


const testButtons = () => {
    const [amount, setAmount] = useState('')

    return (
        <div className="flex">
            <button onClick={() => store.dispatch(inc())}> + </button>
            <button onClick={() => store.dispatch(dec())}> - </button>
        </div>
    )
}

export default testButtons;