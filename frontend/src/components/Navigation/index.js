// import React from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, Redirect, useHistory } from "react-router-dom"
// import * as sessionActions from "../../store/session";

// const Navigation = () => {
    
//     const sessionUser = useSelector(state => state.session.user);
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const handleLogOut = () => {
//         dispatch(sessionActions.logout(sessionUser.id))
//         return history.push('/');
//     }

//     if (sessionUser){
//         return (
//             <>
//                 <h1>Hello, {sessionUser.displayName}.</h1>
//                 <h1> {sessionUser.email}</h1>
//                 <h1>Top Questions</h1>
//                 <br/>
//                 <Link to="/questions/ask">
//                 <button>Ask Question</button>
//                 </Link>
//                 <br/>
//                 <button onClick={handleLogOut}>Logout</button>
//             </>
//         )
//     } 
    
// }

// export default Navigation;