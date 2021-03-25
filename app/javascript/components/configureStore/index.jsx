import { createStore } from 'redux';

export const countReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DEC':
            return state - 1;
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

export const store = createStore(updateIconReducer);
