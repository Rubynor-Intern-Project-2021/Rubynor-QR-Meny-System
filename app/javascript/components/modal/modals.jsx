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
            <div className="text-gray-700 pb-2 px-7">
                {text}
            </div>
            <div className="flex justify-center p-4">
                <div className="flex justify-center">
                    <button className="font-semibold rounded-sm border bg-gray-50 border-purple-200 px-5 py-1 m-2 hover:bg-gray-100" onClick={handleCancel}>
                        Avbryt
                    </button>
                </div>
                <div className="flex justify-center">
                    <button className="font-semibold rounded-sm text-white bg-red-600 border border-purple-200 px-7 py-1 m-2 hover:bg-red-700" onClick={handleConfirm}>
                        Slett
                    </button>
                </div>
            </div>
        </div>
    );
};