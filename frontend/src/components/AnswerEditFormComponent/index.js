import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import { fetchAnswer, getAnswer, updateAnswer } from "../../store/answers";

const AnswerEditForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const {answerId}= useParams();
    const answer = useSelector(getAnswer(answerId));
    const [description, setDescription] = useState("");

    useEffect(() => {
        dispatch(fetchAnswer(answerId))
          .catch(() => {
            history.push("/NotFound");
        });
    },[dispatch])

    useEffect(() => {
        if (answer) {
            setDescription(answer.description);
        }
    }, [answer]);

    if(!sessionUser) history.push('/login');

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(updateAnswer({
            answer: {
                description: description,
                id: answer.id,
                editorId: answer.answererId,
                answererId: answer.answererId,
            }
        }))
        history.push(`/questions/${answer.questionId}`);
    };
    if(answer){
        return(
            <div className="container">
            <div id="content">
                <div className='header'>
                    <div className="headline">Edit a public answer</div>
                </div>
                <div>
                    <div style={{marginBottom:"5px"}}>Question: {answer.title}</div>
                    <form id="question-form">
                        <div className="body-box">
                            <textarea onChange={e => setDescription(e.target.value)} value={description}>
                            </textarea>
                        </div>
                    </form>
                </div>
                <button className="submit-question" onClick={handleSubmit}>Update Answer</button>
            </div>
        </div>   
        )
    }
};

export default AnswerEditForm;