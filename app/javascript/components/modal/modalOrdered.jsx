import React, { useEffect, useState } from 'react';
import { ModalAlert } from "./modals";
import { storeModalOrdered, hideModal } from "../configureStore";

const ModalOrdered = ({restaurantId}) => {
    const [modalStatus, setModalStatus] = useState(false);

    storeModalOrdered.subscribe(() => {
        setModalStatus(storeModalOrdered.getState())
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
                    text="Takk for din bestilling! Maten din vil komme så fort den er klar."
                    handleClose={() => storeModalOrdered.dispatch(hideModal())}
                    handleClick={ () => window.location.href = Routes.restaurant_path({id: restaurantId})}
                    linkText="Tilbake til hovedsiden"
                />
            </div>
    }


    return (
        <div>
            {modal}
        </div>
    );
};

export default ModalOrdered;