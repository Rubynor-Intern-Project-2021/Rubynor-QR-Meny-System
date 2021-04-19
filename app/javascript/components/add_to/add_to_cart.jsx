import React, {useState} from 'react'
import axios from "axios";
import { showModal, storeIcon, storeModalAlert } from '../configureStore'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const addToCart = ({menuItem}) => {
    const [num, setNum] = useState(1);

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

    storeModalAlert.subscribe(() => {
        console.log("alert " + storeModalAlert.getState())
    });

    const addMultipleToCart = () => {
        axios.get('/api/v1/add_to_cart',
            {
            params: {menu_item_id: menuItem.id, amount: num}})
            .then(response => {
                axios.get('/api/v1/total_amount').then(res => {
                    storeIcon.dispatch({
                        type: 'UPDATE_ICON',
                        payload: res.data
                    });
                });
                setNum(1)
            }).catch(error => {
            console.log(error);
        })
    };


    return (
        <>
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

            <div>
                <button id="leggTil" onClick={() => { addMultipleToCart(); storeModalAlert.dispatch(showModal()); }}
                        className="uppercase text-white bg-gray-700 mb-3 mt-1 py-2 w-full">
                        Legg i handlekurv
                </button>
            </div>
        </div>
        </>
    )
}

export default addToCart;

