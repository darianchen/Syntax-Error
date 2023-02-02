import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVotes, getVotes, makeVote } from "../../store/vote";
import { ReactComponent as GrayUpArrow } from './svgs/gray-up-arrow.svg';
import { ReactComponent as OrangeUpArrow } from './svgs/orange-up-arrow.svg';
import { ReactComponent as GrayDownArrow } from './svgs/gray-down-arrow.svg';
import { ReactComponent as OrangeDownArrow } from './svgs/orange-down-arrow.svg';


const Vote = ({post, sessionUser}) => {
    const dispatch = useDispatch();
    const votes = useSelector(getVotes());
    const voters = votes.map((vote) => {return vote.voterId});
    let vote = "";
    
    const [voteCount, setVoteCount] = useState(votes.length);

    if(sessionUser){
        for(let i = 0; i < votes.length; i++){
            if(sessionUser.id === votes[i].voterId) vote = votes[i].vote;
        }
    }
    
    useEffect(() => {
        dispatch(fetchVotes(post.id))
    }, [post.id]);



    // const votes = useSelector(state => {
    //     if(!loading){
    //         return state.votes;
    //     }else{
    //         return [];
    //     }
    // });

    const handleClick = (bool) => {
        if(!sessionUser){return alert("You must be logged in to vote")} 
        dispatch(makeVote(sessionUser.id, post.id, bool));
        if(bool){
            setVoteCount(voteCount + 1);
        }else{
            setVoteCount(voteCount - 1);
        }
    }


        return(
            <div className="vote-container">
                {sessionUser && votes && voters.includes(sessionUser.id) && vote ? <OrangeUpArrow onClick={() => handleClick(true)}/> : <GrayUpArrow onClick={() => handleClick(true)}/>}
                <h1 className="vote-count">{votes ? votes.length : 0}</h1>
                {sessionUser && votes && voters.includes(sessionUser.id) && !vote ? <OrangeDownArrow onClick={() => handleClick(false)}/> : <GrayDownArrow onClick={() => handleClick(false)}/>}
            </div>
        )
    }



export default Vote;