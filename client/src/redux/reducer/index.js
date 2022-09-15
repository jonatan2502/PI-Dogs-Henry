import { 
    CLEAR_DETAILS,
    GET_ALL_BREEDS, 
    GET_ALL_TEMPERAMENTS, 
    GET_BREED, 
    GET_FILTERED_BREEDS,
    ORDER_BY,
    SEARCH_BY_NAME
    } from "../actions"

const initialState = {
    breeds: [],
    breedDetail: [],
    temperaments: [],
    orderedBreeds: [],
    foundByName: [],
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
                breedDetail: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case CLEAR_DETAILS:
            return {
                ...state,
                breedDetail: action.payload
            }
        case GET_FILTERED_BREEDS:
            return {
                ...state,
                breeds: JSON.parse(JSON.stringify(action.payload))
            }
        case ORDER_BY:
            return {
                ...state,
                breeds: JSON.parse(JSON.stringify(action.payload))
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                foundByName: JSON.parse(JSON.stringify(action.payload))
            }
        default:
            return state
    }
}

export default rootReducer