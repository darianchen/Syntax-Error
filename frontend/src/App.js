import React, { useEffect } from "react";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from "./components/LoginFormComponent";
import Navbar from "./components/Nav";
import SignupFormPage from "./components/SignupFormComponent";
import UserPage from "./components/UserShowComponent";
import SplashPage from "./components/Splash";
import UsersPage from "./components/UserIndexComponent";
import QuestionShow from "./components/QuestionShowComponent";
import QuestionIndex from "./components/QuestionIndexComponent";
import QuestionForm from "./components/QuestionFormComponent";
import TagIndexComponent from "./components/TagIndexComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/users";
import QuestionEditForm from "./components/QuestionEditFormComponent";
import AnswerEditForm from "./components/AnswerEditFormComponent";
import { fetchAnswers } from "./store/answers";
import LeftSidebar from "./components/LeftSidebarComponent";
import Footer from "./components/Footer";

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAnswers());
  },[])

  return (
    <>
      <Navbar />
      <div id="page-content">
        <Switch>
        <Route exact path="/">
              {sessionUser ? <LeftSidebar/> : ""}
              <SplashPage />
        </Route>

          <Route path="/login">
              <LoginFormPage />
          </Route>

          <Route path="/signup">
              <SignupFormPage />
          </Route>

          <Route exact path="/users/:userId">
              <UserPage/>
          </Route>

          <Route exact path="/users">
              <UsersPage/>
          </Route>

          <Route exact path="/questions">
            <LeftSidebar/>
            <QuestionIndex/>
          </Route>

          <Route exact path="/questions/ask">
              <QuestionForm/>
          </Route>

          <Route exact path="/questions/:questionId">
              <LeftSidebar />
              <QuestionShow/>
          </Route>

          <Route exact path="/questions/:questionId/edit">
              <QuestionEditForm/>
          </Route>

          <Route exact path="/tags">
              <LeftSidebar/>
              <TagIndexComponent/>
          </Route>

          <Route exact path="/answers/:answerId/edit">
              <AnswerEditForm/>
          </Route>     
      </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;