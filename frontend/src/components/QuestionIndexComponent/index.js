import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";
import { clearQuestions } from "../../store/questions";
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
  const [search, setSearch] = useQueryParam('search', StringParam);
  const [tag, setTag] = useQueryParam('tag', StringParam);
  const [totalPages, setTotalPages] = useState(1);
  const defaultPage = 1;

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
    dispatch(clearQuestions());
    dispatch(fetchQuestions(page, order, search, tag))
      .catch(() => {
          history.push("/NotFound");
      });
  }, [search, tag]);

  useEffect(() => {
    if (questions.length > 0)
      setTotalPages(questions[0].totalPages)
  }, [questions, setTotalPages])

  const mapQuestions = () => (
    questions.map(question => (
      <QuestionItem key={question.id} question={question} />
    ))
  );

  const handleChangePage = (currentPage) => {
    setPage(parseInt(currentPage));
    dispatch(fetchQuestions(currentPage, order, search, tag))
      .catch(() => {
        history.push("/NotFound");
    });
  };

  const handleChangeOrder = (order) => {
    setOrder(order);
    setPage(1)
    dispatch(fetchQuestions(1, order, search, tag))
      .catch(() => {
        history.push("/NotFound");
    });
  }

  return (
    <div className="question-index">
      <div className="question-index-header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>{tag !== undefined ? `Questions tagged [${tag}]` : (search !== undefined ? `Search Results` : `${order} Questions`)}</h1>
            {search !== undefined ? <h4 style={{marginTop: '5px', color: 'gray'}}>Result for {search}</h4> : <h4></h4>}
          </div>
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
      <div style={{marginLeft:"50px"}}>
        <Pagination page={page ? parseInt(page) : defaultPage } pages={totalPages} handleChangePage={handleChangePage} />
      </div>
    </div>
  );
};

export default QuestionIndex;