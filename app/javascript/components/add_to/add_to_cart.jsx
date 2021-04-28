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
        <div className="flex w-full pb-4 bg-white">
            <div className="w-1/3 border border-pink-800 rounded-l-sm bg-white text-gray-800 py-2 px-2">
                <div className="flex justify-between">
                    <button onClick={decNum}  className="">
                        <AiOutlineMinus/>
                    </button>
                    <p className=""> {num} </p>
                    <button onClick={incNum}  className="">
                        <AiOutlinePlus/>
                    </button>
                </div>
            </div>

            <div className="text-white bg-pink-800 py-2 w-2/3 flex rounded-r-sm justify-center">
                <button id="leggTil" onClick={() => { addMultipleToCart(); storeModalAlert.dispatch(showModal()); }}
                        className="uppercase w-full h-full">
                        Legg i kurv
                </button>
            </div>
        </div>
    )
}

export default addToCart;

