import axios from 'axios'
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'

import { GET_MACHINES, ADD_MACHINE } from './types'

export const getMachines = () => (dispatch) => {
    const config = {
        headers: {
            'X-CSRF-Token': localStorage.getItem('token'),
        },
    };
    axios
        .get('/api/machines?_format=json', config)
        .then(res => {
            dispatch({
                type: GET_MACHINES,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const addMachine = (comp, owner) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'X-CSRF-Token': localStorage.getItem('token'),
        },
    };

    const machineJson = JSON.stringify({
        _links: {
            type: {
                href: "http:\/\/localhost\/rest\/type\/node\/machines"
            }
        },
        type: [{
            target_id: "machines"
        }],
        title: [{
            value: comp,
        }],
        field_name: [{
            value: owner
        }]
    })

    axios
        .post('/node?_format=hal_json', machineJson, config)
        .then(res => {
            dispatch(createMessage({ add: "Создание успешно" }))
            dispatch({
                type: ADD_MACHINE,
                payload: res.data
            })
        }).catch(err => {
        })
}