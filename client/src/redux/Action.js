const GET_BREEDS = 'GET_BREEDS'
const CREATE_BREED = 'CREATE_BREED'

export function getAllBreeds() {
    return async function(dispatch) {
        return fetch('localhost:3001/dogs')
        .then(res => res.json())
        .then(res => dispatch({
            type: GET_BREEDS,
            payload: res
        }))
    }
}

export function createBreed() {
    return async function(dispatch) {
        return fetch()
    }
}