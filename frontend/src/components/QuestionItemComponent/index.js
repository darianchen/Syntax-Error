import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchUser, getUser } from "../../store/users";
import './index.css'
import moment from 'moment';
import { getAnswers } from "../../store/answers";
import TagsComponent from "../TagIndexComponent/tags.js"

const QuestionItem = ({question}) => {
    const { id, title, body, authorId, createdAt, editorId, updatedAt} = question;
    const dispatch = useDispatch();
    const user = useSelector(getUser(authorId));
    const filteredAnswers = [];

    const initialVotes = (question && question.votesAttributes) ? question.votesAttributes.map((vote) => {return vote.vote ? 1 : -1}).reduce((vote, current) => vote + current, 0) : 0

    let answers = useSelector(getAnswers).slice();

    answers.filter(answer => {
        if(parseInt(answer.questionId) === parseInt(question.id)){
            filteredAnswers.push(answer);
        }
    })
    
    useEffect(() => {
        dispatch(fetchUser(authorId));
    },[]);

    const getBody = (body) => {
        return body.split(/\s+/).slice(0,10).join(" ");
    }

    const dateTimeAgo = moment(createdAt).fromNow();

    if (user) {
    return(
            <div className="question-container">
                <div className="question-stats">
                    <div className="question-index-votes">{initialVotes === 1 ? initialVotes + " vote" : initialVotes + " votes"}</div>
                    <div className="question-index-answers">{question.answerCount === 1 ? question.answerCount + " answer" : question.answerCount + " answers"}</div>
                </div>
                <div className="question-content-summary">
                    <Link to={`/questions/${id}`}> <h3 className="question-listing-title">{title}</h3></Link>
                    <div className="question-content-summary-body">{getBody(body)} ...</div>
                    <div className="tags-content-summary">
                        <TagsComponent tags={question?.tagsAttributes} />
                    </div>
                    <div className="question-content-summary-bottom-user-card"><div>{user.displayName} asked {dateTimeAgo}</div> <div className="editor">{}</div></div>
                </div>
            </div>
        )
    }
}

export default QuestionItem;
