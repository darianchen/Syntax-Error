import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchUser, getUser } from "../../store/users";
import './index.css'
import moment from 'moment';
import { fetchAnswers, getAnswers } from "../../store/answers";

const QuestionItem = ({question}) => {
    const { id, title, body, authorId, createdAt, editorId, updatedAt} = question;
    const dispatch = useDispatch();
    const user = useSelector(getUser(authorId));
    let editedBy = "";
    const filteredAnswers = [];

    let answers = useSelector(getAnswers).slice();

    answers.filter(answer => {
        if(parseInt(answer.questionId) === parseInt(question.id)){
            filteredAnswers.push(answer);
        }
    })
    
    const now = moment(createdAt).fromNow();

    editedBy = "Edited " + now;

    // if(editor) {
    //     editedBy = "Edited by " + editor.displayName + " " + now;
    // }

    useEffect(() => {
        dispatch(fetchUser(authorId));
    },[]);

    const getBody = (body) => {
        return body.split(/\s+/).slice(0,10).join(" ");
    }

    const dateTimeAgo = moment(createdAt).fromNow();


    //const moment = new Date();
    //const dateTimeAgo = moment(createdAt).fromNow();

    if (user) {
    return(
            <div className="question-container">
                <div className="question-stats">
                    <div className="question-index-votes">votes</div>
                    <div className="question-index-answers">{filteredAnswers.length} answers</div>
                </div>
                <div className="question-content-summary">
                    <Link to={`/questions/${id}`}> <h3 className="question-listing-title">{title}</h3></Link>
                    <div className="question-content-summary-body">{getBody(body)} ...</div>
                    <div className="question-content-summary-bottom-user-card"><div>{user.displayName} asked {dateTimeAgo}</div> <div className="editor">{}</div></div>
                </div>
            </div>
        )
    }
}

export default QuestionItem;
