import React, { useState } from 'react';
import { ModalConfirm } from "./modals";
import {storeModalConfirmMenu, storeDeleteItem, hideModalConfirmM } from "../configureStore";

const ModalConfirmMenu = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [menuId, setMenuId] = useState();

    storeModalConfirmMenu.subscribe(() => {
        setModalStatus(storeModalConfirmMenu.getState())
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
                    handleCancel={() => storeModalConfirmMenu.dispatch(hideModalConfirmM())}
                    handleConfirm={() => { storeModalConfirmMenu.dispatch(hideModalConfirmM());
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

export default ModalConfirmMenu;