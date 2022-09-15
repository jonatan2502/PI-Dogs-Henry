import { 
    CLEAR_DETAILS,
    GET_ALL_BREEDS, 
    GET_ALL_TEMPERAMENTS, 
    GET_BREED, 
    GET_FILTERED_BREEDS,
    SORT_BY} from "../actions"

const initialState = {
    breeds: [],
    breedDetail: [],
    temperaments: []
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
                breeds: action.payload
            }
        case SORT_BY:
            return {
                ...state,
                breeds: JSON.parse(JSON.stringify(action.payload))
            }
        default:
            return state
    }
}

export default rootReducer