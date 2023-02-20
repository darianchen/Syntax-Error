import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getQuestions } from "../../store/questions";
import LeftSidebar from "../LeftSidebarComponent";
import QuestionItem from "../QuestionItemComponent";
import './index.css';

const QuestionIndex = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
   
    const handleClick = (e) => {
        if (sessionUser){
            history.push('/questions/ask');
        }else{
            history.push('/login');
        }
    }

    let questions = useSelector(getQuestions).slice().reverse();
    

    const mapQuestions = () => {
        return questions.map(question => (
            <QuestionItem key={question.id} question={question}/>
        ))
    };
        return(
            <>  
                <div className="page-content">
                    <LeftSidebar/>
                    <div className="question-index">
                        <div className="question-index-header"><h1>All {questions.length} Questions</h1>
                            <button onClick={handleClick} className="question-index-button">Ask Question</button>
                        </div>
                            {mapQuestions()} 
                    </div>
                </div>
            </>
        )
};

export default QuestionIndex;