import { REDUCER_ACTION_TYPES } from "./userListActionTypes"

const initialUserListState = {
    loading: false,
    users: [],
    error: '',
}

const usersListReducer = (state = initialUserListState, action) => {
    switch(action.type) {
        case REDUCER_ACTION_TYPES.FETCH_USERS_REQUEST : return {...state, loading: true}
        case REDUCER_ACTION_TYPES.FETCH_USERS_SUCCESS: return {...state, loading: false, users: action.payload, error: ''}
        case REDUCER_ACTION_TYPES.FETCH_USERS_FAILURE: return {...state, loading: false, users: [], error: action.payload}
        default: return state
    };
}

export default usersListReducer;