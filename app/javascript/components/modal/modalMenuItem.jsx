import React, { useState } from 'react';
import { ModalForConfirm } from "./modals";
import { storeDeleteItem, hideModal, storeModalMenuItem } from "../configureStore";

const ModalMenuItem = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [itemId, setItemId] = useState();

    storeModalMenuItem.subscribe(() => {
        setModalStatus(storeModalMenuItem.getState())
    });

    storeDeleteItem.subscribe(() => {
        console.log("itemId: " + storeDeleteItem.getState())
        setItemId(storeDeleteItem.getState())
    });

    let modal = null;
    if(modalStatus) {
        modal =
            <div className="flex justify-center">
                <ModalForConfirm
                    header="Slett"
                    text="Ønsker du å slette denne retten/ drikken?"
                    handleCancel={() => storeModalMenuItem.dispatch(hideModal())}
                    handleConfirm={() => { storeModalMenuItem.dispatch(hideModal());
                    window.location.href = Routes.admin_set_item_status_path({item_id: itemId, status: 0});}}

                />
            </div>
    }

    return (
        <div className="">
            {modal}
        </div>
    );
};

export default ModalMenuItem;