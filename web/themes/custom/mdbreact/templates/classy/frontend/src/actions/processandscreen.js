import axios from 'axios'
import { tokenConfig } from './auth'

import { GET_PROCESSANDSCREEN } from './types'

export const getProcessAndScreen = () => (dispatch) => {
    const config = {
        headers: {
            'X-CSRF-Token': localStorage.getItem('token'),
        },
    };
    axios
        .get('/api/processandscreen?_format=json', config)
        .then(res => {
            dispatch({
                type: GET_PROCESSANDSCREEN,
                payload: res.data
            })
        }).catch(err => console.log(err))
}