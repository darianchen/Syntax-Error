import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeVote, downVote } from "../../store/votes";
import { ReactComponent as GrayUpArrow } from './svgs/gray-up-arrow.svg';
import { ReactComponent as OrangeUpArrow } from './svgs/orange-up-arrow.svg';
import { ReactComponent as GrayDownArrow } from './svgs/gray-down-arrow.svg';
import { ReactComponent as OrangeDownArrow } from './svgs/orange-down-arrow.svg';


const Vote = ({post, sessionUser, isAnswer, dispatchPost}) => {
    const dispatch = useDispatch();
    const votes = post.votesAttributes;

    const initialVotes = votes ? votes.map((vote) => {return vote.vote ? 1 : -1}).reduce((vote, current) => vote + current, 0) : 0
    const initialVoters = votes ? votes.map((vote) => {return vote.voterId}) : []
    let initialVote = ""

    const [voteCount, setVoteCount] = useState()
    const [voters, setVoters] = useState([])
    const [vote, setVote] = useState("");

    if(sessionUser && votes){
        for(let i = 0; i < votes.length; i++){
            if(sessionUser.id === votes[i].voterId) initialVote = votes[i].vote;
        }
    }

    useEffect(() => {
        setVoteCount(initialVotes)
        setVoters(initialVoters)
        setVote(initialVote)

    }, [initialVote, initialVotes])


    const handleClickGray = (bool) => {
        if(!sessionUser){return alert("You must be logged in to vote")}

        if(sessionUser.id === post?.authorId || (isAnswer && sessionUser.id === post?.answererId)) {
            return alert("You cannot vote on your own post")
        }
        const has_user_voted = voters.includes(sessionUser.id)
        const user_id = sessionUser.id

        if(has_user_voted) {
            for (const v of Object.values(votes || {})) {
                if(v.voterId === sessionUser.id) {
                    dispatch(downVote(v.id, dispatchPost))
                }
            }
            setVote("")
            setVoters(voters.filter(v => v !== user_id))
        }
        dispatch(makeVote(sessionUser.id, post.id, bool, isAnswer, dispatchPost));
        setVote(bool)
        setVoters([...voters, user_id])
        if(bool){
            setVoteCount(voteCount + 1)
        }else{
            setVoteCount(voteCount - 1)
        }
    }


    const handleClickOrange = (bool) => {
        // if(sessionUser.id === post?.authorId || sessionUser.id === post?.answererId) {return}
        // if(!sessionUser){return alert("You must be logged in to vote")}
        const user_id = sessionUser.id

        for (const v of Object.values(votes || {})) {
            if(v.voterId === sessionUser.id) {
                dispatch(downVote(v.id, dispatchPost))
            }
        }
        setVote("")
        setVoters(voters.filter(v => v !== user_id))

        if(bool){
            setVoteCount(voteCount + 1)
        }else{
            setVoteCount(voteCount - 1)
        }
    }


    return(
        <div className="vote-container" key={isAnswer ? `answer${post.id}` : `question${post.id}`}>
            {sessionUser && votes && voters.includes(sessionUser.id) && vote ? <OrangeUpArrow onClick={() => handleClickOrange(false)}/> : <GrayUpArrow onClick={() => handleClickGray(true)}/>}
            <h1 className="vote-count">{voteCount}</h1>
            {sessionUser && votes && voters.includes(sessionUser.id) && !vote ? <OrangeDownArrow onClick={() => handleClickOrange(true)}/> : <GrayDownArrow onClick={() => handleClickGray(false)}/>}
        </div>
    )
}

export default Vote;