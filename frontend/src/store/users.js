import csrfFetch from "./csrf";

export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_USER = "users/RECEIVE_USER";
export const REMOVE_USER = "users/REMOVE_USER";

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const removeUser = userId => ({
    type: REMOVE_USER,
    userId
});

export const getUser = userId => ({users}) => users ? users[userId] : null;
export const getUsers = ({users}) => users ? Object.values(users) : [];

export const fetchUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data.user));
};

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch(`/api/users`);
    const data = await res.json();
    dispatch(receiveUsers(data));
};

export const deleteUser = userId => async dispatch => {
    await csrfFetch(`/api/users${userId}`, {method: "DELETE"});
    dispatch(removeUser(userId));
};

const usersReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_USERS:
            return {...state, ...action.users};
        case RECEIVE_USER:
            nextState[action.user.id] = action.user;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }
};

export default usersReducer;