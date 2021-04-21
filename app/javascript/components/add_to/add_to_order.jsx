import React from 'react'
import { showModal, storeModalOrdered } from '../configureStore'

const addToOrder = () => {

    storeModalOrdered.subscribe(() => {
        console.log("alert " + storeModalOrdered.getState())
    });

    return (
        <div>
            <button id="bestill" onClick={() => { storeModalOrdered.dispatch(showModal()); }}
            className="h-full w-full">
                    Bestill
            </button>
        </div>
    )
}

export default addToOrder;

