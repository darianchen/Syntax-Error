import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import './index.css'
import moment from 'moment';
import { deleteAnswer } from "../../store/answers";
import { getUser } from "../../store/users";

const AnswerItem = ({answer}) => {
    const dispatch = useDispatch();
    const { id, description, answererId, createdAt} = answer;
    const answerer = useSelector(getUser(answererId))
    const sessionUser = useSelector(state => state.session.user);
    const date = moment(createdAt).fromNow()


    

    const handleClick = () => {
        dispatch(deleteAnswer(id))
    }

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

            {sessionUser && sessionUser.id === answererId ?<div className="crud-functions answer-crud">
                <div style={{display:"flex"}}>
                    <div className="edit-delete" style={{marginRight:"5px"}}><Link to={`/answers/${id}/edit`}>Edit</Link></div>
                    <div className="edit-delete" onClick={handleClick}>Delete</div>
                </div>
                <div style={{marginLeft:0}}>Answered by <span>{answerer?.displayName}</span> {date}</div>
            </div> : <div className="crud-functions answer-crud" style={{textAlign:"right"}}><div style={{marginLeft:0, width:"100%"}}>Answered by <span>{answerer?.displayName}</span> {date}</div></div> }
        </div>
        )
    }


export default AnswerItem;
