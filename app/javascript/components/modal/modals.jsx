import React from 'react';
import {MdClose} from "react-icons/md";

export const ModalForAlert = ({text, handleClose, handleClick, linkText}) => {
    return (
        <div className="flex py-3 px-4 bg-white text-gray-700 text-sm rounded-sm border border-gray-300 ">
            <div className="flex relative">
                <div className="flex pr-6">
                    <div >{text} </div>
                    <button className="text-blue-800 underline pl-1 pr-3" onClick={handleClick}>
                        {linkText}
                    </button>
                </div>
                <button className="absolute top-0.5 right-0" onClick={handleClose}>
                    <MdClose size={16}/>
                </button>
            </div>
        </div>
    );
};

export const ModalForOrder = ({text, handleClose, handleClick, linkText}) => {
    return (
        <div className="relative flex justify-center">
            <div className=" w-screen h-screen bg-gray-400 opacity-50">
            </div>
            <div className="absolute top-48 flex lg:w-1/4 py-5 px-5 m-7 bg-white opacity-100 text-gray-700 text-sm rounded-md border border-gray-300 ">
                <div className="flex relative">
                    <div className=" pr-7">
                        <div> {text} </div>
                        <br/>
                        <button className="text-blue-800 underline" onClick={handleClick}>
                            {linkText}
                        </button>
                    </div>
                    <button className="absolute top-0.5 right-0" onClick={handleClose}>
                        <MdClose size={16}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ModalForConfirm = ({header, text, handleCancel, handleConfirm}) => {
    return (
            <div className="rounded-md bg-white border border-gray-300">
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