import React from 'react'
import axios from "axios";
import { showModal, storeIcon, storeModalAlert } from '../configureStore'
import { IoAddCircleOutline } from "react-icons/io5";
import {gray} from "colorette";

const addIcon = ({menuItem}) => {

    storeModalAlert.subscribe(() => {
        console.log("alert " + storeModalAlert.getState())
    });

    const addOneToCart = () => {
        axios.get('/api/v1/add_to_cart',
            {
            params: {menu_item_id: menuItem.id, amount: 1}})
            .then(response => {
                axios.get('/api/v1/total_amount').then(res => {
                    storeIcon.dispatch({
                        type: 'UPDATE_ICON',
                        payload: res.data
                    });
                });
            }).catch(error => {
            console.log(error);
        })
    };


    return (
        <>
            <button id="leggTil"
                    onClick={() => { addOneToCart(); storeModalAlert.dispatch(showModal()); }}
                    className="text-purple-900">
                <IoAddCircleOutline size={27}/>
            </button>
        </>
    )
}

export default addIcon;

