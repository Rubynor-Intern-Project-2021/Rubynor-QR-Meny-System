import {createStore} from 'redux';

export const showModal = () => {
    return {
        type: 'SHOW'
    }
};

export const hideModal = () => {
    return {
        type: 'HIDE'
    }
};

export const modalAlertReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW':
            state = true
            return state;
        case 'HIDE':
            state = false;
            return state;
    }
};

export const modalOrderedReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW':
            state = true
            return state;
        case 'HIDE':
            state = false;
            return state;
    }
};

export const modalMenuReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW':
            state = true
            return state;
        case 'HIDE':
            state = false;
            return state;
    }
};


export const modalMenuItemReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW':
            state = true
            return state;
        case 'HIDE':
            state = false;
            return state;
    }
};

export const modalAllergenReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW':
            state = true
            return state;
        case 'HIDE':
            state = false;
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
export const storeModalOrdered = createStore(modalOrderedReducer);
export const storeModalMenu = createStore(modalMenuReducer);
export const storeModalMenuItem = createStore(modalMenuItemReducer);
export const storeModalAllergen = createStore(modalAllergenReducer);
export const storeDeleteItem = createStore(deleteItemReducer);

