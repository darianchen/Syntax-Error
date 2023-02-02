import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchAnswers, getAnswers } from "../../store/answers";
import AnswerItem from "../AnswerItemComponent";
import './index.css';

const AnswerIndex = ({question}) => {
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