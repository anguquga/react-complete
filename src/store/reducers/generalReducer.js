import * as actionTypes from '../actions';

const initialState = {
    authenticated: false
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.LOGIN:
            /*const newState = Object.assign({}, state);
            * newState.counter= state.counter+1;
            * return newState;*/
            return {
                ...state,
                authenticated: !state.authenticated
            }
        default:
            break;

    }

    return state;
};

export default reducer;