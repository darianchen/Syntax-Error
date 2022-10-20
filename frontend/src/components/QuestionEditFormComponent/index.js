import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import { getQuestion, updateQuestion } from "../../store/questions";

const QuestionEditForm = () => {
    const dispatch = useDispatch();
    const {questionId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    let question = {title: "", body: ""};
    question = useSelector(getQuestion(questionId));

    
    const [title, setTitle] = useState(question.title);
    const [body, setBody] = useState(question.body);

    if(!sessionUser) history.push('/login');

    const handleSubmit=(e)=>{
        e.preventDefault();
        debugger
        dispatch(updateQuestion({

            title: title, 
            body: body,
            authorId: question.authorId,
            editorId: sessionUser.id,
            id: question.id,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt
        }))
        history.push('/questions');
    };


    
    return(
        <>
            <div className="container">
                <div id="content">
                    <div className='header'>
                        <div className="headline">Edit a public question</div>
                    </div>
                    <form id="question-form">
                        <div className="title-box">
                            <label className="title label">
                                Title
                            </label>
                            <p className="title-text">
                                Be Specific and imagine you're asking a question to another person
                            </p>
                            <input className="title-input" onChange={e => setTitle(e.target.value)} placeholder="e.g Is there an R function for finding the index of an element in a vector?" value={title}></input>
                        </div>
                        <div className="body-box">
                            <label className="body label">
                                Body
                            </label>
                            <div className="body-text">
                                Include all the information someone would need to answer your question
                            </div>
                            <textarea value={body} onChange={e => setBody(e.target.value)}>
                            </textarea>
                        </div>
                    </form>
                    <button className="submit-question" onClick={handleSubmit}>Update Question</button>
                </div>
            </div>     
        </>
    )
};

export default QuestionEditForm;