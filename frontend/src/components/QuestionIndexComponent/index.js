import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import QuestionItem from "../QuestionItemComponent";
import './index.css';

const QuestionIndex = () => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [order, setOrder] = useState("Newest");
  const questions = useSelector(state => orderQuestions(Object.values(state.questions), order));
  
  const handleClick = () => {
    if (sessionUser) {
      history.push('/questions/ask');
    } else {
      history.push('/login');
    }
  }

  function orderQuestions(questions, order) {
    if (questions) {
      const orderFunc = (a, b) => {
        switch (order) {
          case "Newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "Oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "Most Answered":
            return b.answerCount - a.answerCount;
          case "Least Answered":
            return a.answerCount - b.answerCount;
          default:
            return 0;
        }
      };
      return questions.sort(orderFunc);
    }
    return questions;
  };

  const mapQuestions = () => (
    questions.map(question => (
      <QuestionItem key={question.id} question={question} />
    ))
  );

  return (
    <div className="question-index">
      <div className="question-index-header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>All {questions.length} Questions</h1>
          <button onClick={handleClick} className="question-index-button">Ask Question</button>
        </div>
        <div className="filter-buttons">
          {["Least Answered", "Most Answered", "Oldest", "Newest"].map(opt => (
            <button
              key={opt}
              className={order === opt ? "button-dark" : "button-light"}
              onClick={() => setOrder(opt)}
              style={{height:"39.59px", float:"right", marginTop:"5px"}}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      {mapQuestions()}
    </div>
  );
};

export default QuestionIndex;