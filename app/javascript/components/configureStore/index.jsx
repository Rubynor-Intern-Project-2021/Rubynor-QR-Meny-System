import {createStore} from 'redux';

export const showModalAlert = () => {
    return {
        type: 'SHOW_ALERT'
    }
};

export const hideModalAlert = () => {
    return {
        type: 'HIDE_ALERT'
    }
};

export const showModalConfirmM = () => {
    return {
        type: 'SHOW_CONFIRM_MENU'
    }
};

export const hideModalConfirmM = () => {
    return {
        type: 'HIDE_CONFIRM_MENU'
    }
};

export const showModalConfirmMI = () => {
    return {
        type: 'SHOW_CONFIRM_MENU_ITEM'
    }
};

export const hideModalConfirmMI = () => {
    return {
        type: 'HIDE_CONFIRM_MENU_ITEM'
    }
};

export const modalAlertReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            state = true
            return state;
        case 'HIDE_ALERT':
            state = false;
            return state;
        default:
            return state;
    }
};


export const modalConfirmReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_CONFIRM_MENU':
            state = true
            return state;
        case 'HIDE_CONFIRM_MENU':
            state = false;
            return state;
        default:
            return state;
    }
};

export const modalConfirmItemReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_CONFIRM_MENU_ITEM':
            state = true
            return state;
        case 'HIDE_CONFIRM_MENU_ITEM':
            state = false;
            return state;
        default:
            return state;
    }
};

export const deleteItemReducer = (state = 0, action) => {
    switch(action.type) {
        case 'DELETE_ITEM':
            return action.payload;
    }
};

export const updateIconReducer = (state = 0, action) => {
    switch(action.type) {
        case 'UPDATE_ICON':
            return action.payload;
    }
};

export const orderListReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_ORDERS':
            return action.payload;
        case 'REMOVE_ORDER':
            return order => action.payload.id !== order.id;
        default:
            throw new Error();
    }
};

export const storeIcon = createStore(updateIconReducer);
export const storeModalAlert = createStore(modalAlertReducer);
export const storeModalConfirmMenu = createStore(modalConfirmReducer);
export const storeDeleteItem = createStore(deleteItemReducer);
export const storeModalConfirmMenuItem = createStore(modalConfirmItemReducer);

