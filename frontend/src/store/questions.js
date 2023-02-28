import csrfFetch from "./csrf";

export const RECEIVE_QUESTIONS = "questions/RECEIVE_QUESTIONS";
export const RECEIVE_QUESTION = "questions/RECEIVE_QUESTION";
export const REMOVE_QUESTION = "questions/REMOVE_QUESTION";
const CLEAR_QUESTIONS = 'questions/CLEAR_QUESTIONS';

export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

export const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question
});

export const removeQuestion = questionId => ({
    type: REMOVE_QUESTION,
    questionId
});

export const clearQuestions = () => ({
    type: CLEAR_QUESTIONS
});

export const getQuestion = questionId => ({questions}) => questions ? Object.values(questions).find(question => question.id === parseInt(questionId)) : null;
export const getQuestions = ({questions}) => questions ? Object.values(questions) : [];

export const fetchQuestion = questionId => async dispatch => {
    const res = await csrfFetch(`/api/questions/${questionId}`);
    const data = await res.json();
    dispatch(receiveQuestion(data.question));
};

export const fetchQuestions = (page, order, search, tag) => async dispatch => {
    const res = await csrfFetch(`/api/questions?page=${page}&&order=${order}&&search=${search}&&tag=${tag}`);
    const data = await res.json();
    dispatch(receiveQuestions(data));
};

export const fetchAllQuestions = () => async dispatch => {
    const res = await csrfFetch(`/api/questions?all=true`);
    const data = await res.json();
    dispatch(receiveQuestions(data));
};

export const deleteQuestion = questionId => async dispatch => {
    await csrfFetch(`/api/questions/${questionId}`, {method: "DELETE"});
    dispatch(removeQuestion(questionId));
};

export const updateQuestion = question => async dispatch => {
    const res = await csrfFetch(`/api/questions/${question.id}`, {
      method: 'PUT',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(receiveQuestion(data.question));
  };
  
const questionsReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {...action.questions};
        case RECEIVE_QUESTION:
            nextState[action.question.id] = action.question;
            return nextState;
        case REMOVE_QUESTION:
            delete nextState[action.questionId];
            return nextState;
        case CLEAR_QUESTIONS:
            return {};
        default:
            return state;
    }
};

export default questionsReducer;