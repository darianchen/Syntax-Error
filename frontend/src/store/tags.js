import csrfFetch from "./csrf";

export const RECEIVE_TAGS = "tags/RECEIVE_TAGS";
export const RECEIVE_TAG = "tags/RECEIVE_TAG";
export const REMOVE_TAG = "tags/REMOVE_TAG";

export const receiveTags = tags => ({
    type: RECEIVE_TAGS,
    tags
});

export const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag
});

export const removeTag = tagId => ({
    type: REMOVE_TAG,
    tagId
});

export const getTag = tagId => ({tags}) => tags ? tags[tagId] : null;
export const getTags = ({tags}) => tags ? Object.values(tags) : [];

export const fetchTag = tagId => async dispatch => {
    const res = await csrfFetch(`/api/tags/${tagId}`);
    const data = await res.json();
    dispatch(receiveTag(data.tag));
};

export const fetchTags = () => async dispatch => {
    const res = await csrfFetch(`/api/tags`);
    const data = await res.json();
    dispatch(receiveTags(data));
};

export const deleteTag = tagId => async dispatch => {
    await csrfFetch(`/api/tags/${tagId}`, {method: "DELETE"});
    dispatch(removeTag(tagId));
};

export const updateTag = tag => async dispatch => {
    const res = await csrfFetch(`/api/tags/${tag.id}`, {
      method: 'PUT',
      body: JSON.stringify(tag),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(receiveTag(data));
  };

const tagsReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_TAGS:
            return {...state, ...action.tags};
        case RECEIVE_TAG:
            nextState[action.tag.id] = action.tag;
            return nextState;
        case REMOVE_TAG:
            delete nextState[action.tagId];
            return nextState;
        default:
            return state;
    }
};

export default tagsReducer;