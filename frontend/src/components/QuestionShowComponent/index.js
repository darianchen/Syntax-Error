import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteQuestion, fetchQuestion, getQuestion } from "../../store/questions";
import LeftSidebar from "../LeftSidebarComponent";
import './index.css'
import moment from 'moment';
import { fetchUser, getUser } from "../../store/users";



const QuestionShow = () => {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const question = useSelector(getQuestion(questionId)) || {createdAt: "", title: "", body: "", authorId: ""};
    const dateTimeAgo = moment(question.createdAt).fromNow();
    let user = useSelector(getUser(question.authorId));

    useEffect(() => {
        document.querySelector(".left-sidebar-questions").style.backgroundColor = "#F1F2F3";
        document.querySelector(".left-sidebar-questions").style.borderRight = "4px solid orange";
        dispatch(fetchQuestion(questionId))
    },[dispatch, questionId]);
   
    const handleClick = (e) =>{
        if (sessionUser){
            history.push('/questions/ask');
        }else{
            history.push('/login');
        }
    }

    const handleDelete = (e) => {
        dispatch(deleteQuestion(questionId));
        history.push('/questions');
    }

    if (question){
    return (
        <>
            <div className="question-show-container">
                <LeftSidebar/>
            <div className="question-show-content">
                    <div className="title-and-button">
                        <h1 className="question-title">{question.title}</h1>
                            <button onClick={handleClick} className="question-show-ask-question-button">
                                Ask Question
                            </button>
                        
                    </div>
                    <ul className="stats">
                        <li>
                            Asked <span>{dateTimeAgo}</span> by <span className="displayName">{user ? user.displayName : "display name"}</span>
                        </li>
                        <li>
                            
                        </li>
                    </ul>
                    <hr></hr>
                    <div className="question-show-bottom">
                        <div className="vote-container">
                            <svg className="up-arrow" width="36" height="36" viewBox="0 0 36 36"><path d="M2 25h32L18 9 2 25Z" fill="#CCCCCC"></path></svg>
                            <h1 className="vote-count">0</h1>
                            <svg className="down-arrow" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z" fill="#CCCCCC"></path></svg>
                        </div>
                        <div className="question-body">
                            {question.body}
                        </div>
                    </div>
                    <div className="crud-functions">
                        <div className="edit-delete"><Link to={`/questions/${questionId}/edit`}>Edit</Link></div>
                        <div className="edit-delete" onClick={handleDelete}>Delete</div>
                    </div>

                </div>
            </div>
        </>
    )}
};

export default QuestionShow