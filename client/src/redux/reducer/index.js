import { 
    GET_ALL_BREEDS, 
    GET_BREED } from "../actions"

const initialState = {
    breeds: [],
    breed: []
}

const rootReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                breeds: action.payload
            }
        case GET_BREED:
            return {
                ...state,
                breed: action.payload
            }
        default:
            return state
    }
}