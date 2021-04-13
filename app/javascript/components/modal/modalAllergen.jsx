import React, { useState } from 'react';
import { ModalConfirm } from "./modals";
import {storeModalAllergen, storeDeleteItem, hideModal } from "../configureStore";

const ModalConfirmMenu = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [allergenId, setAllergenId] = useState();

    storeModalAllergen.subscribe(() => {
        setModalStatus(storeModalAllergen.getState())
    });

    storeDeleteItem.subscribe(() => {
        console.log("allergenId: " + storeDeleteItem.getState())
        setAllergenId(storeDeleteItem.getState())
    });

    let modal = null;
    if(modalStatus) {
        modal =
            <div className="flex justify-center">
                <ModalConfirm
                    header="Slett allergen"
                    text="Ønsker du å slette dette allergenet?"
                    handleCancel={() => storeModalAllergen.dispatch(hideModal())}
                    handleConfirm={() => { storeModalAllergen.dispatch(hideModal());
                        window.location.href = Routes.admin_allergen_slett_path({a_id: allergenId});}}

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

export default ModalConfirmMenu;