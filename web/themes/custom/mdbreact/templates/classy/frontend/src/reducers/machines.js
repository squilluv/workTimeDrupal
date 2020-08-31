import { GET_MACHINES, ADD_MACHINE } from '../actions/types.js'

const initialState = {
    machines: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MACHINES:
            return {
                ...state,
                machines: action.payload
            }
        case ADD_MACHINE:
            return {
                ...state,
                machines: [...state.course, action.payload]
            }
        default:
            return state
    }
}