import { combineReducers } from "redux"

import machines from "./machines"
import processandscreen from "./processandscreen"

import auth from "./auth"

import errors from "./errors"
import messages from "./messages"

export default combineReducers({
    machines,
    processandscreen,
    auth,
    errors,
    messages,
})