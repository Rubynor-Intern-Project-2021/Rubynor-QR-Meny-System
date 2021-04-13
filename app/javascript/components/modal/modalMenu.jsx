import React, { useState } from 'react';
import { ModalConfirm } from "./modals";
import {storeModalMenu, storeDeleteItem, hideModal } from "../configureStore";

const ModalMenu = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [menuId, setMenuId] = useState();

    storeModalMenu.subscribe(() => {
        setModalStatus(storeModalMenu.getState())
    });

    storeDeleteItem.subscribe(() => {
        console.log("menuId: " + storeDeleteItem.getState())
        setMenuId(storeDeleteItem.getState())
    });

    let modal = null;
    if(modalStatus) {
        modal =
            <div className="flex justify-center">
                <ModalConfirm
                    header="Slett meny"
                    text="Ønsker du å slette denne menyen?"
                    handleCancel={() => storeModalMenu.dispatch(hideModal())}
                    handleConfirm={() => { storeModalMenu.dispatch(hideModal());
                    window.location.href = Routes.admin_set_menu_status_path({menu_id: menuId, status: 3});}}

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

export default ModalMenu;