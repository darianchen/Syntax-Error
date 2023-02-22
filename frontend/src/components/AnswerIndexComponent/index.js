import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../store/questions";
import AnswerItem from "../AnswerItemComponent";

    const AnswerIndex = ({questionId}) => {
        const dispatch = useDispatch();
        let answers = useSelector(getQuestion(questionId)).answers;
  
        const mapAnswers = () => {
            return answers.map(answer => (
                <AnswerItem key={answer.id} answer={answer}/>
            ))
        };
            return(
                <>  
                <div>
                    {mapAnswers()}
                </div>
                </>
            )
    };

    export default AnswerIndex;