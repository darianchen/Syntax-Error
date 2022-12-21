import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import csrfFetch from "../../store/csrf";
import './index.css'

const QuestionForm = () => {
     
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const author = useSelector(state => state.session.user);   
    const [errors, setErrors] = useState();
    const history = useHistory();

    const dispatch = useDispatch();

    if(!author) history.push('/login');

    const handleClick = async e => {
        e.preventDefault();
        const question = {title: title, body: body, author_id: author.id};
        const res = await csrfFetch('/api/questions', {
            method: 'POST',
            body: JSON.stringify(question)
        });
        if (res.ok){
            let data = await res.json();
            window.data = data;
            history.push(`${data.question.id}`);
        } else{
            
        }
    };

    return(
        <>
            <div className="container">
                <div id="content">
                    <div className='header'>
                        <div className="headline">Ask a public question</div>
                    </div>
                    <div className="question-and-draft">
                        <form id="question-form">
                            <div className="title-box">
                                <label className="title label">
                                    Title
                                </label>
                                <p className="title-text">
                                    Be Specific and imagine you're asking a question to another person
                                </p>
                                <input className="title-input-form" onChange={e => setTitle(e.target.value)} placeholder="e.g Is there an R function for finding the index of an element in a vector?"></input>
                            </div>
                            <div className="body-box">
                                <label className="body label">
                                    Body
                                </label>
                                <div className="body-text">
                                    Include all the information someone would need to answer your question
                                </div>
                                <textarea onChange={e => setBody(e.target.value)}>

                                </textarea>
                            </div>
                        </form>

                        <aside className="steps-container">
                            <div className="steps-title">
                                Draft your question
                            </div>
                            <div className="steps">
                                <div className="steps-info">
                                    <p>
                                        The community is here to help you with
                                        specific coding, algorithm, or language
                                        problems.
                                    </p>
                                    <br />
                                    <p>Avoid asking opinion-based questions.</p>
                                </div>
                                <ul className="nstruction">
                                    <li>
                                        <span className="number">1.</span>
                                        <span className="step-text"> Summarize the problem.</span>
                                    </li>
                                    <li>
                                        <span className="number">2.</span>
                                        <span className="step-text"> Describe what you've tried.</span>
                                    </li>
                                    <li>
                                        <span className="number">3.</span> 
                                        <span className="step-text"> Show some code.</span>
                                    </li>
                                </ul>
                            </div>
                        </aside>


                    </div>
                    <button className="submit-question" onClick={handleClick}>Post your question</button>
                </div>
            </div>
        </>
    )
};

export default QuestionForm;