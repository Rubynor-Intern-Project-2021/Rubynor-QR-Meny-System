import React, { useEffect, useState } from 'react';
import { ModalAlert } from "./modals";
import { storeModalAlert, hideModalAlert } from "../configureStore";

const ModalAlertCart = () => {
    const [modalStatus, setModalStatus] = useState(false);

    storeModalAlert.subscribe(() => {
        setModalStatus(storeModalAlert.getState())
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setModalStatus(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [modalStatus]);

    let modal = null;
    if(modalStatus) {
        modal =
            <div className="flex justify-center">
                <ModalAlert
                    text="Varen ble lagt til i handlevogna"
                    handleClose={() => storeModalAlert.dispatch(hideModalAlert())}
                />
            </div>
    }


    return (
        <>
            <div>
                {modal}
            </div>
        </>
    );
};

export default ModalAlertCart;