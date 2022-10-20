import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchQuestions, getQuestions } from "../../store/questions";
import LeftSidebar from "../LeftSidebarComponent";
import QuestionItem from "../QuestionItemComponent";
import './index.css';

const QuestionIndex = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const handleClick = (e) => {
        if (sessionUser){
            history.push('/questions/ask');
        }else{
            history.push('/login');
        }
    }

    const dispatch = useDispatch();
    const questions = useSelector(getQuestions);
    
    useEffect(() => {
         dispatch(fetchQuestions());
    }, []);

    const mapQuestions = () => {
        return questions.map(question => (
            <QuestionItem key={question.id} question={question}/>
        ))
    };
        return(
            <>
                <div className="page-content">
                    <LeftSidebar/>
                    <div className="question-index-right">
                        <div className="question-index-header"><h1>All Questions</h1>
                            <button onClick={handleClick} className="question-index-button">Ask Question</button>
                        </div>
                        <div className="data-controller">{questions.length} questions</div>
                            {mapQuestions()} 

                    </div>
                </div>
            </>
        )
};

export default QuestionIndex;