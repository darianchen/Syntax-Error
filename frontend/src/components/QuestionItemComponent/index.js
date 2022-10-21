import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchUser, getUser } from "../../store/users";
import './index.css'
import moment from 'moment';

const QuestionItem = ({question}) => {
    const { id, title, body, authorId, createdAt, editorId, updatedAt} = question;
    const dispatch = useDispatch();
    const user = useSelector(getUser(authorId));
    let editor = useSelector(getUser(editorId));
    let editedBy = "";
    
    const now = moment(updatedAt).fromNow();


    if(editor) {
        editedBy = "Edited by " + editor.displayName + " " + now;
    }

  


    useEffect(() => {
        dispatch(fetchUser(authorId));

    },[question]);

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
                    <div className="question-index-answers">answers</div>
                    <div className="question-index-views">views</div>
                </div>
                <div className="question-content-summary">
                    <Link to={`/questions/${id}`}> <h3 className="question-listing-title">{title}</h3></Link>
                    <div className="question-content-summary-body">{getBody(body)} ...</div>
                    <div className="question-content-summary-bottom-user-card"><div>{user.displayName} asked {dateTimeAgo}</div> <div className="editor">{editedBy}</div></div>
                </div>
              
            {/* <div className="question-content-summary-bottom">
                        <div className="question-content-summary-body">{getBody(body)} ...</div>
                        <div className="question-content-summary-bottom-user-card"><div>{user.displayName} asked {dateTimeAgo}</div> <div className="editor">{editorId}</div></div>
                    </div> */}


            </div>
        )
    }
}

export default QuestionItem;
