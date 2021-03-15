import { createStore } from 'redux';

export const inc = () => {
    return {
        type: 'INC'
    };
};

export const dec = () => {
    return {
        type: 'DEC'
    };
};


export const countReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DEC':
            return state - 1;
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

export const store = createStore(countReducer);
