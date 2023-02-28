import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswers } from "../../store/answers";
import { fetchAllQuestions } from "../../store/questions";
import csrfFetch from "../../store/csrf";
import './index.css'

const AnswerForm = ({questionId}) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState();
    const author = useSelector(state => state.session.user);   

    const handleClick = async e => {
        e.preventDefault();
        const answer = {answerer_id: author.id, description: description, question_id: questionId};
        const res = await csrfFetch('/api/answers', {
            method: 'POST',
            body: JSON.stringify(answer)
        });
        if (res.ok){
            let data = await res.json();
            dispatch(fetchAnswers());
            dispatch(fetchAllQuestions())
            setDescription("");
        } 
    };

    return(
        <form className="answer-form-container">
            <h2 id="your-answer">Your Answer</h2>
            <textarea onChange={e => setDescription(e.target.value)} id="" cols="30" rows="10" value={description}></textarea>
            <button className="login-button post-answer-button" onClick={handleClick}>Post Your Answer</button>
        </form>
    )
};

export default AnswerForm;