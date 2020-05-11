import * as actionTypes from '../actions';

const initialState = {
    persons: [{
        id: 1,
        name: 'Andres',
        age: 35
    },
        {
            id: 2,
            name: 'Laura',
            age: 30
        }]
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.DELETE_PERSON:
            /*const newState = Object.assign({}, state);
            * newState.counter= state.counter+1;
            * return newState;*/

            //const personsT = this.state.persons.slice();
            const personsT = [...state.persons];
            personsT.splice(action.personIndex, 1);
            return {
                ...state,
                persons: personsT
            }
        case actionTypes.PERSON_NAME_CHANGED:
            /*const newState = Object.assign({}, state);
            * newState.counter= state.counter+1;
            * return newState;*/

            const personIndex = state.persons.findIndex(p => {
                return p.id === action.id;
            });

            const personT = {
                ...state.persons[personIndex] /*... crea una copia de todos los atributos y nueva instancia de Person en ese indice*/
            };

            personT.name = action.value;

            const personsTemp = [...state.persons];
            personsTemp[personIndex] = personT;

            return {
                ...state,
                persons: personsTemp
            }
        default:
            break;

    }

    return state;
};

export default reducer;