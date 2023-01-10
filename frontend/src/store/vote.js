import csrfFetch from "./csrf"

const MAKE_VOTE = '/api/votes';
const RECEIVE_VOTE = "RECEIVE_VOTE";
const REMOVE_VOTE = "REMOVE_VOTE";


export const makeVote = (voterId, postId, vote) => async(dispatch) => {
    const res = await csrfFetch( MAKE_VOTE, {
        method: 'POST',
        body: JSON.stringify({vote: {voterId: voterId, postId: postId, vote: vote}})
    });

    let data = await res.json();

    if(!data.errors){
        dispatch({type: RECEIVE_VOTE, vote: data.vote })
        return res;
    } else {
        throw data;
    }
}

export const getVotes = () => {
    return(
        (store) => {
            return Object.values(store.votes);
        }
    )
};

export const downVote = (voteId) => async(dispatch) => {
    const res = await csrfFetch( `/api/votes/${voteId}`, {
        method: 'DELETE'
    });

    let data = await res.json();

    if(!data.errors){
        dispatch({type: REMOVE_VOTE, voteId: voteId});
        return res;
    } else {
        throw data;
    }
}

export const fetchVotes = (postId) => async(dispatch) => {
    const res = await csrfFetch(`/api/votes/${postId}`);
    const votes = await res.json();
    dispatch( {type: MAKE_VOTE, votes} );
}

const votesReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch(action.type){
        case MAKE_VOTE:
            return {...action.votes.votes}
        case RECEIVE_VOTE:
            nextState[action.vote.id] = action.vote;
            return nextState;
        case REMOVE_VOTE:
            delete nextState[action.voteId];
            return nextState;
        default:
            return state;
    }
}
 
export default votesReducer;