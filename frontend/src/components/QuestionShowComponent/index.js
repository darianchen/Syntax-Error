import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteQuestion, getQuestion, fetchQuestions } from "../../store/questions";
import "./index.css";
import moment from "moment";
import AnswerForm from "../AnswerFormComponent";
import AnswerIndex from "../AnswerIndexComponent";
import Vote from "../VoteComponent";
import TagsComponent from "../TagIndexComponent/tags.js"

const QuestionShow = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const question = useSelector(getQuestion(questionId));

  const handleClick = (e) => {
    if (sessionUser) {
      history.push("/questions/ask")
    } else {
      history.push("/login");
    }
  };

  const handleDelete = (e) => {
    dispatch(deleteQuestion(questionId));
    history.push("/questions");
  };

  const dispatchQuestion = () => {
    dispatch(fetchQuestions())
  }

  if (question) {
    return (
      <>
          <div className="question-show-content">
            <div className="title-and-button">
              <h1 className="question-title">{question.title}</h1>
              <button
                onClick={handleClick}
                className="question-show-ask-question-button"
              >
                Ask Question
              </button>
            </div>
            <ul className="stats">
              <li>
                Asked <span>{moment(question.createdAt).fromNow()}</span> by{" "}
                <span className="displayName">{question.author}</span>
              </li>
              <li></li>
            </ul>
            <hr></hr>
            <div className="question-show-bottom" >
              <Vote key={`question${question.id}`} post={question} sessionUser={sessionUser} isAnswer={false} dispatchPost={dispatchQuestion}/>
              <div className="question-body">
                {question.body}
                <div className="question-tags">
                  <TagsComponent tags={question?.tagsAttributes} />
                </div>
              </div>
            </div>
            {sessionUser && sessionUser.id === question.authorId ? (
              <div className="crud-functions">
                <div style={{display:"flex"}}>
                  <div className="edit-delete" style={{ marginRight: "5px" }}>
                    <Link to={`/questions/${questionId}/edit`}>Edit</Link>
                  </div>
                  <div className="edit-delete" onClick={handleDelete}>
                    Delete
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="answer-count">{question.answerCount} answer{question.answerCount === 1 ? "" : "s"}</div>
            <AnswerIndex />
            {sessionUser ? <AnswerForm questionId={questionId} /> : ""}
            {sessionUser ? (
              ""
            ) : (
              <div style={{ marginTop: "15px" }}>
                Please <a href="/login">login</a> to answer
              </div>
            )}
        </div>
      </>
    );
  }
};

export default QuestionShow;
