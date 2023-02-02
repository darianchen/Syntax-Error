import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import { getAnswer, updateAnswer } from "../../store/answers";

const AnswerEditForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const {answerId}= useParams();
    const answer = useSelector(getAnswer(answerId));
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (answer) {
          setDescription(answer.description);
        }
      }, [answer]);

      const question = useSelector(state => {
        if(answer) {
            return state.questions[answer.questionId]
        }
        return null;
     })

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

return(
        <div className="container">
        <div id="content">
            <div className='header'>
                <div className="headline">Edit a public answer</div>
            </div>
            <div className="question-and-draft">
                <div>{question?.title}</div>
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
};

export default AnswerEditForm;