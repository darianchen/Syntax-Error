import csrfFetch from "./csrf";

export const RECEIVE_ANSWERS = "answers/RECEIVE_ANSWERS";
export const RECEIVE_ANSWER = "answers/RECEIVE_ANSWER";
export const REMOVE_ANSWER = "answers/REMOVE_ANSWER";

export const receiveAnswers = answers => ({
    type: RECEIVE_ANSWERS,
    answers
});

export const receiveAnswer = answer => ({
    type: RECEIVE_ANSWER,
    answer
});

export const removeAnswer = answerId => ({
    type: REMOVE_ANSWER,
    answerId
});

export const getAnswer = answerId => ({answers}) => answers ? answers[answerId] : null;
export const getAnswers = ({answers}) => answers ? Object.values(answers) : [];


export const fetchAnswer = answerId => async dispatch => {
    const res = await csrfFetch(`/api/answers/${answerId}`);
    const data = await res.json();
    dispatch(receiveAnswer(data.answer));
};

export const fetchAnswers = (questionId) => async dispatch => {
    const res = await csrfFetch(`/api/answers`);
    const data = await res.json();
    dispatch(receiveAnswers(data));
};

export const deleteAnswer = answerId => async dispatch => {
    await csrfFetch(`/api/answers/${answerId}`, {method: "DELETE"});
    dispatch(removeAnswer(answerId));
};

export const updateAnswer = answer => async dispatch => {
    const res = await csrfFetch(`/api/answers/${answer.id}`, {
      method: 'PUT',
      body: JSON.stringify(answer),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(receiveAnswer(data));
  };


const answersReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_ANSWERS:
            return {...state, ...action.answers};
        case RECEIVE_ANSWER:
            nextState[action.answer.id] = action.answer;
            return nextState;
        case REMOVE_ANSWER:
            delete nextState[action.answerId];
            return nextState;
        default:
            return state;
    }
};

export default answersReducer;