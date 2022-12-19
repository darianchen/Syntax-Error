import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchAnswer, fetchAnswers, getAnswers } from "../../store/answers";
import { fetchQuestions, getQuestions } from "../../store/questions";
import AnswerItem from "../AnswerItemComponent";
import QuestionItem from "../QuestionItemComponent";
import './index.css';

const AnswerIndex = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const {questionId} = useParams();
    const filteredAnswers = [];

    const dispatch = useDispatch();
    let answers = useSelector(getAnswers).slice();

    answers.filter(answer => {
        if(parseInt(answer.questionId) === parseInt(questionId)){
            filteredAnswers.push(answer);
        }
    })
   
    const handleClick = (e) => {
        if (sessionUser){
            history.push('/questions/ask');
        }else{
            history.push('/login');
        }
    }

    // let answers = useSelector(getQuestions).slice().reverse();
    
    useEffect(() => {
         dispatch(fetchAnswers());         
    }, []);

    const mapAnswers = () => {
        return filteredAnswers.map(answer => (
            <AnswerItem key={answer.id} answer={answer}/>
        ))
    };
        return(
            <>  
            <div>
                {mapAnswers()}
            </div>
            </>
        )
};

export default AnswerIndex;