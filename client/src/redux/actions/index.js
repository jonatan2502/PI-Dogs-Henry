import axios from "axios"

export const GET_ALL_BREEDS = 'GET_ALL_BREEDS'
export const CREATE_BREED = 'CREATE_BREED'
export const GET_BREED = 'GET_BREED'

export function getAllBreeds() {
    return async function(dispatch) {
        const res = await axios.get('localhost:3001/dogs')
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: res
        })
    }
}

export function getBreed(id) {
    return async function(dispatch) {
        const res = await axios.get(`localhost:3001/dogs/${id}`)
        return dispatch({
            type: GET_BREED,
            payload: res
        })
    }
}

// export function createBreed(breed) {
//     return async function() {
//         return {
//             payload: CREATE_BREED,
//             payload: {
//                 name: breed.name,
//                 min_height: breed.minHeight, 
//                 max_height: breed.maxHeight, 
//                 min_weight: breed.minWeight, 
//                 max_weight: breed.maxWeight, 
//                 min_life_span: breed.minLifeSpan, 
//                 max_life_span: breed.maxLifeSpan,
//                 image: breed.image,
//             }
//         }
//     }
// }