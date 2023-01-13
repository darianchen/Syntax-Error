import csrfFetch from "./csrf";

export const RECEIVE_QUESTIONS = "questions/RECEIVE_QUESTIONS";
export const RECEIVE_QUESTION = "questions/RECEIVE_QUESTION";
export const REMOVE_QUESTION = "questions/REMOVE_QUESTION";

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

export const getQuestion = questionId => ({questions}) => questions ? questions[questionId] : null;
export const getQuestions = ({questions}) => questions ? Object.values(questions) : [];

export const fetchQuestion = questionId => async dispatch => {
    const res = await csrfFetch(`/api/questions/${questionId}`);
    const data = await res.json();
    dispatch(receiveQuestion(data.question));
};

export const fetchQuestions = () => async dispatch => {
    const res = await csrfFetch(`/api/questions`);
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
            return {...state, ...action.questions};
        case RECEIVE_QUESTION:
            nextState[action.question.id] = action.question;
            return nextState;
        case REMOVE_QUESTION:
            delete nextState[action.questionId];
            return nextState;
        default:
            return state;
    }
};

export default questionsReducer;