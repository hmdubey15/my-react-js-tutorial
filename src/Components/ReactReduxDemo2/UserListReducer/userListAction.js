import axios from 'axios';

import { REDUCER_ACTION_TYPES } from "./userListActionTypes";

export const fetchUsers = () => (dispatch) => {
    dispatch({ type: REDUCER_ACTION_TYPES.FETCH_USERS_REQUEST });
    axios.get('https://jsonplaceholder.typicode.com/users').then(
        response => {
            const users = response.data;
            dispatch({ type: REDUCER_ACTION_TYPES.FETCH_USERS_SUCCESS, payload: users });
        }
    ).catch(
        error => {
            const errorMsg = error.message;
            dispatch({ type: REDUCER_ACTION_TYPES.FETCH_USERS_FAILURE, payload: errorMsg });
        }
    )
} 