import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnswers, getAnswers } from "../../store/answers";
import AnswerItem from "../AnswerItemComponent";

const AnswerIndex = () => {
    const {questionId} = useParams();
    const filteredAnswers = [];
    const dispatch = useDispatch();
    let answers = useSelector(getAnswers).slice();

    answers.filter(answer => {
        if(parseInt(answer.questionId) === parseInt(questionId)){
            filteredAnswers.push(answer);
        }
    })

    useEffect(() => {
        dispatch(fetchAnswers())
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