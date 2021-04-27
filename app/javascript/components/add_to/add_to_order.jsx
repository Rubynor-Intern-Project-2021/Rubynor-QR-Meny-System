import React from 'react'
import { showModal, storeModalOrdered } from '../configureStore'

const addToOrder = () => {

    storeModalOrdered.subscribe(() => {
        console.log("alert " + storeModalOrdered.getState())
    });

    return (
        <div className="pb-4 bg-white">
            <button onClick={() => { storeModalOrdered.dispatch(showModal()); }}
            className="w-full uppercase bg-pink-800 rounded-sm text-white py-2">
                    Bestill
            </button>
        </div>
    )
}

export default addToOrder;

