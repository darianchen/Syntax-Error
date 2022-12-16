import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import csrfFetch from "../../store/csrf";
import './index.css'

const AnswerForm = ({questionId}) => {
     
    const [description, setDescription] = useState();
    const author = useSelector(state => state.session.user);   
    const [errors, setErrors] = useState();
    const history = useHistory();
    const dispatch = useDispatch();

    // if(!author) history.push('/login');

    const handleClick = async e => {
        e.preventDefault();
        const answer = {answerer_id: author.id, description: description, question_id: questionId};
        const res = await csrfFetch('/api/answers', {
            method: 'POST',
            body: JSON.stringify(answer)
        });
        if (res.ok){
            let data = await res.json();
            console.log(data);
        } 
    };

    return(
        <form className="answer-form-container">
            <h2 id="your-answer">Your Answer</h2>
            <textarea onChange={e => setDescription(e.target.value)} id="" cols="30" rows="10"></textarea>
            <button className="login-button post-answer-button" onClick={handleClick}>Post Your Answer</button>
        </form>
    )
};

export default AnswerForm;