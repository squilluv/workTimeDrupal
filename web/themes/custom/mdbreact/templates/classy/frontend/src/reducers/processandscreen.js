import { GET_PROCESSANDSCREEN } from '../actions/types.js'

const initialState = {
    processandscreen: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROCESSANDSCREEN:
            return {
                ...state,
                processandscreen: action.payload
            }
        default:
            return state
    }
}