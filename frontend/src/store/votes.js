import csrfFetch from "./csrf"

const MAKE_VOTE = '/api/votes';
const RECEIVE_VOTE = "RECEIVE_VOTE";
const REMOVE_VOTE = "REMOVE_VOTE";

export const makeVote = (voterId, postId, vote, type, dispatchPost) => async(dispatch) => {
    const res = await csrfFetch( MAKE_VOTE, {
        method: 'POST',
        body: JSON.stringify({vote: {voterId: voterId, postId: postId, vote: vote, postType: type}})
    });

    let data = await res.json();

    if(!data.errors){
        dispatch({type: RECEIVE_VOTE, vote: data.vote })
        dispatchPost()
        return res;
    } else {
        throw data;
    }
}

export const downVote = (voteId, dispatchPost) => async(dispatch) => {
    const res = await csrfFetch( `/api/votes/${voteId}`, {
        method: 'DELETE'
    });

    let data = await res.json();

    if(!data.errors){
        dispatch({type: REMOVE_VOTE, voteId: voteId});
        dispatchPost()
        return res;
    } else {
        throw data;
    }
}