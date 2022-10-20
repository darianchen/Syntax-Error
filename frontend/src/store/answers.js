import csrfFetch from "./csrf";

const RECEIVE_ANSWERS = 'answers/RECEIVE_ANSWERS'
const RECEIVE_ANSWER = 'answers/RECEIVE_ANSWER'
const REMOVE_ANSWER = 'answers/REMOVE_ANSWER'

export const receiveAnswers = (answers) => {
    return {
        type: RECEIVE_ANSWERS,
        answers
    };
};

export const receiveAnswer = (answer) => {
    return {
        type: RECEIVE_ANSWER,
        answer
    };
};

export const removeAnswer = (answerId) => {
    return {
        type: REMOVE_ANSWER,
        answerId
    };
};

export const getAnswer = answerId => ({answers}) => answers ? answers[answerId] : null;
export const getAnswers= ({answers}) => answers ? Object.values(answers) : [];

 export const fetchAnswers = (questionId) => async dispatch => {
    const res = await csrfFetch(`/api/questions/${questionId}/answers`)
    const data = await res.json()
    dispatch(receiveAnswers(data))
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
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }
};

 export default answersReducer;