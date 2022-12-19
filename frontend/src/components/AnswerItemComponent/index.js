import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchUser, getUser } from "../../store/users";
import './index.css'
import moment from 'moment';

const AnswerItem = ({answer}) => {
    const { id, description, answerId, createdAt, editorId, updatedAt} = answer;
    const dispatch = useDispatch();

    return(
        <div className="answer-container">
            <div className="answer-top">
                <div className="vote-container">
                    <svg className="up-arrow" width="36" height="36" viewBox="0 0 36 36"><path d="M2 25h32L18 9 2 25Z" fill="#CCCCCC"></path></svg>
                    <h1 className="vote-count">0</h1>
                    <svg className="down-arrow" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z" fill="#CCCCCC"></path></svg>
                </div>
                <div className="question-body">
                    {description}
                </div>
            </div>
            <div className="crud-functions answer-crud">
                <div className="edit-delete" style={{marginRight:"5px"}}>Edit</div>
                <div className="edit-delete">Delete</div>
            </div>
        </div>
        )
    }


export default AnswerItem;
