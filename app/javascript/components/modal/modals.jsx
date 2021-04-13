import React from 'react';
import {MdClose} from "react-icons/md";

export const ModalAlert = ({text, handleClose}) => {
    return (
        <div className="flex py-3 px-3 bg-white text-gray-700 text-sm rounded-sm border border-purple-200 divide-x divide-gray-700">
            <div className="pr-2">{text} </div>
            <button className="pl-2" onClick={handleClose}>
                <MdClose/>
            </button>
        </div>
    );
};

export const ModalConfirm = ({header, text, handleCancel, handleConfirm}) => {
    return (
        <div className="w-80 rounded-md bg-white border border-purple-200">
            <div className="flex justify-center text-gray-900 font-bold pt-5 pb-3 px-7">
                {header}
            </div>
            <div className="text-gray-700 pb-5 px-7">
                {text}
            </div>
            <div className="flex justify-between ">
                <div className="flex justify-center w-1/2 border border-purple-200 py-2">
                    <button className="font-semibold text-gray-900 " onClick={handleCancel}>
                        Avbryt
                    </button>
                </div>
                <div className="flex justify-center w-1/2 border border-purple-200 py-2">
                    <button className="font-semibold text-red-600" onClick={handleConfirm}>
                        Slett
                    </button>
                </div>
            </div>
        </div>
    );
};