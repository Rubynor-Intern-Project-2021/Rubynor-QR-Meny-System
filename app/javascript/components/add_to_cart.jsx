import React, {useEffect} from 'react'
import {useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {store} from './configureStore'
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import {ModalAlert} from "./modal";

const addToCart = ({menuItem}) => {
    addToCart.propTypes = {
        price: PropTypes.number
    }

    const [num, setNum] = useState(1);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const incNum = () => {
        setNum(num + 1);
    }

    const decNum = () => {
        if (num > 0) {
            setNum(num - 1);
        } else {
            setNum(0);
        }
    }

    const addMultipleToCart = () => {
        axios.get('/api/v1/add_to_cart',
            {
            params: {menu_item_id: menuItem.id, amount: num}})
            .then(response => {

                axios.get('/api/v1/total_amount').then(res => {
                    store.dispatch({
                        type: 'UPDATE_ICON',
                        payload: res.data
                    });
                });
                setNum(1)
            }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenModal(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [openModal]);

    let modal = null;
    if(openModal) {
        modal =
            <div className="flex justify-center">
                <ModalAlert
                    text="Varen ble lagt til i handlevogna"
                    handleClose={handleClose}
                />
            </div>
    }

    return (
        <>
            <div className="h-12 ">
                {modal}
            </div>
           <div className="">
                <div className="flex justify-between py-2">
                    <div className="text-gray-800 mb-3 py-2 px-4 rounded-sm border border-purple-200 ">
                        <div className="flex">
                            <button onClick={decNum}  className="">
                                <AiOutlineMinus/>
                            </button>
                            <p className="px-5 font-semibold"> {num} </p>
                            <button onClick={incNum}  className="">
                                <AiOutlinePlus/>
                            </button>
                        </div>
                    </div>
                </div>

                <div >
                    <button onClick={() => { handleOpen(); addMultipleToCart(); }}
                            className="uppercase text-white bg-gray-700 mb-3 mt-1 py-2 w-full">
                        Legg i handlekurv
                    </button>
                </div>
            </div>
        </>
    )
}

export default addToCart;

