import React, { useState } from 'react';
import { ModalConfirm } from "./modals";
import { storeDeleteItem, hideModalConfirmMI, storeModalConfirmMenuItem } from "../configureStore";

const ModalConfirmMenuItem = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [itemId, setItemId] = useState();

    storeModalConfirmMenuItem.subscribe(() => {
        setModalStatus(storeModalConfirmMenuItem.getState())
    });

    storeDeleteItem.subscribe(() => {
        console.log("itemId: " + storeDeleteItem.getState())
        setItemId(storeDeleteItem.getState())
    });

    let modal = null;
    if(modalStatus) {
        modal =
            <div className="flex justify-center">
                <ModalConfirm
                    header="Slett"
                    text="Ønsker du å slette denne retten/ drikken?"
                    handleCancel={() => storeModalConfirmMenuItem.dispatch(hideModalConfirmMI())}
                    handleConfirm={() => { storeModalConfirmMenuItem.dispatch(hideModalConfirmMI());
                    window.location.href=Routes.admin_set_item_status_path({item_id: itemId, status: 3});}}

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

export default ModalConfirmMenuItem;