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

export const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DEC':
            return state - 1;
    }
};

export const store = createStore(counter);
