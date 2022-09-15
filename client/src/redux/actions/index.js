import axios from "axios"

export const GET_ALL_BREEDS = 'GET_ALL_BREEDS'
export const CREATE_BREED = 'CREATE_BREED'
export const GET_BREED = 'GET_BREED'
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS'
export const CLEAR_DETAILS = 'CLEAR_DETAILS'
export const GET_FILTERED_BREEDS = 'GET_FILTERED_BREEDS'
export const SORT_BY = 'SORT_BY'

export function getAllBreeds() {
    return async function(dispatch) {
        const res = await axios.get('http://localhost:3001/dogs')
        // console.log(res.data)
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: res.data
        })
    }
}

export function getBreed(id) {
    return async function(dispatch) {
        const res = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: GET_BREED,
            payload: res.data
        })
    }
}

// export function createBreed(breed) {
//     return async function() {
//         return dispatch({
//             type: CREATE_BREED,
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
//         })
//     }
// }

export function getAllTemperaments() {
    return async function(dispatch) {
        const res = await axios.get('http://localhost:3001/temperaments')
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: res.data
        })
    }
}

export function clearDetails() {
    return async function(dispatch) {
        return dispatch({
            type: CLEAR_DETAILS,
            payload: ''
        })
    }
}

export function getFilteredBreeds(temperament) {
    return async function(dispatch) {
        const res = await axios.get('http://localhost:3001/dogs')
        let filteredResp = []
        if (temperament) {
            res.data.forEach( e => {
            e.Temperamentos.forEach( t => {
                if (t.name === temperament) filteredResp.push(e)})
        })} else {
            filteredResp = res.data
        }
        // console.log('filter', temperament, filteredResp)
        return dispatch({
            type: GET_FILTERED_BREEDS,
            payload: filteredResp
        })
    }
}

export function sortBy(order, breeds) {
    return function(dispatch) {
        if (order === 'asc') breeds.sort((a, b) => a.name.localeCompare(b.name))
        else breeds.sort((a, b) => b.name.localeCompare(a.name))
        const sortedBreeds = []
        console.log(breeds)
        return dispatch({
            type: SORT_BY,
            payload: breeds
        })
    }
}