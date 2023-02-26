import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";
import QuestionItem from "../QuestionItemComponent";
import { fetchQuestions } from "../../store/questions";
import Pagination from 'react-rails-pagination';
import { getQuestions } from "../../store/questions"
import './index.css';

const QuestionIndex = () => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [order, setOrder] = useState("Newest");
  const questions = useSelector(getQuestions).slice();
  const [page, setPage] = useQueryParam('page', StringParam);
  const [totalPages, setTotalPages] = useState(1);
  

  const handleClick = () => {
    if (sessionUser) {
      history.push('/questions/ask');
    } else {
      history.push('/login');
    }
  }

  useEffect(() => {
    if (page === undefined || page === "undefined")
      setPage(1);
    dispatch(fetchQuestions(page))
      .catch(() => {
          history.push("/404");
      });
  }, []);

  useEffect(() => {
    if (questions.length > 0)
      setTotalPages(questions[0].totalPages)
  }, [questions])

//   function orderQuestions(questions, order) {
//     if (questions) {
//       const orderFunc = (a, b) => {
//         switch (order) {
//           case "Newest":
//             return new Date(b.createdAt) - new Date(a.createdAt);
//           case "Oldest":
//             return new Date(a.createdAt) - new Date(b.createdAt);
//           case "Most Answered":
//             return b.answerCount - a.answerCount;
//           case "Least Answered":
//             return a.answerCount - b.answerCount;
//           default:
//             return 0;
//         }
//       };
//       return questions.sort(orderFunc);
//     }
//     return questions;
//   };

const handleChangePage = (currentPage) => {
    setPage(parseInt(currentPage));
    dispatch(fetchQuestions(page))
      .catch(() => {
        history.push("/404");
    });

    if (questions.length > 0)
      setTotalPages(questions[0].totalPages)
  };

  const handleChangeOrder = (order) => {
    setOrder(order);
  }


  const mapQuestions = () => (
    questions.map(question => (
      <QuestionItem key={question.id} question={question} />
    ))
  );

  return (
    <div className="question-index">
      <div className="question-index-header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>All Questions</h1>
          <button onClick={handleClick} className="question-index-button">Ask Question</button>
        </div>
        <div className="filter-buttons">
          {["Least Answered", "Most Answered", "Oldest", "Newest"].map(opt => (
            <button
              key={opt}
              className={order === opt ? "dark-button" : "light-button"}
              onClick={() => handleChangeOrder(opt)}
              style={{height:"39.59px", float:"right", marginTop:"5px"}}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      {mapQuestions()}
      <Pagination page={parseInt(page)} pages={totalPages} handleChangePage={handleChangePage} />
    </div>
  );
};

export default QuestionIndex;