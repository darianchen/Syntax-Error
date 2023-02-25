import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import { getQuestion, updateQuestion, fetchQuestions } from "../../store/questions";

const QuestionEditForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {questionId} = useParams();
    const [tags, setTags] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const question = useSelector(getQuestion(questionId));
    const now = new Date();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (question) {
            setTitle(question.title);
            setBody(question.body);
            setTags(question.tagsAttributes.map((tag => {return tag.name})));
        }
    }, [question]);

    if(!sessionUser) history.push('/login');

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(updateQuestion({
            question: {
                id: question.id,
                title: title,
                body: body,
                authorId: question.authorId,
                editorId: sessionUser.id,
                updatedAt: now,
            },
            tags: tags
        }))
        dispatch(fetchQuestions());
        history.push(`/questions/${question.id}`);
    };


    const handleKeyDown = (e) => {
        if(e.code !== 'Space') return
        const value = e.target.value.trim();
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = '';
    };

    const removeTag = (index) => {
        setTags(tags.filter((el, i) => i !== index))
    }

    return(
        <>
            <div className="container">
                <div id="content">
                    <div className='header'>
                        <div className="headline">Edit a public question</div>
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
                                <input className="input-form" onChange={e => setTitle(e.target.value)} placeholder="e.g Is there an R function for finding the index of an element in a vector?" value={title}></input>
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

                            <div className="label-box">
                                <label className="tags label">
                                    Tags
                                </label>
                                <p className="label-text">
                                    Add up to 5 tags to describe what your question is about.
                                </p>
                                <div className="tags-input-container"> 
                                {tags.map((tag,index) => (
                                    <div className="tag-item" key={index}>
                                        <span className="tag-text">{tag}</span>
                                        <span className="tag-close" onClick={() => removeTag(index)}>&times;</span>
                                    </div>
                                ))}
                                <input className="tags-input" onKeyDown={handleKeyDown}placeholder="e.g. (spring vba arrays)"></input>
                                </div>
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
                                <ul className="instructions">
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
                    <button className="submit-question" onClick={handleSubmit}>Update Question</button>
                </div>
            </div>     
        </>
    )
};

export default QuestionEditForm;