import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchQuestions, getQuestions } from "../../store/questions";
import Footer from "../Footer";
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
    let questions = useSelector(getQuestions).slice().reverse();
    
    useEffect(() => {
         dispatch(fetchQuestions());
    }, []);

    const mapQuestions = () => {
        return questions.map(question => (
            <QuestionItem key={question.id} question={question}/>
        ))
    };
        return(
            <>  <div className="page-content">
                    <div className="question-index">
                        <div className="question-index-header"><h1>All Questions</h1>
                            <button onClick={handleClick} className="question-index-button">Ask Question</button>
                        </div>
                            {mapQuestions()} 
                    </div>
                </div>
                <Footer/>
            </>
        )
};

export default QuestionIndex;