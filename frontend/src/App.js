import React, { useEffect } from "react";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from "./components/LoginFormComponent";
import Navbar from "./components/Nav";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormComponent";
import UserPage from "./components/UserShowComponent";
import SplashPage from "./components/Splash";
import UsersPage from "./components/UserIndexComponent";
import QuestionShow from "./components/QuestionShowComponent";
import QuestionIndex from "./components/QuestionIndexComponent";
import QuestionForm from "./components/QuestionFormComponent";
import TagIndexComponent from "./components/TagIndexComponent";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/users";
import QuestionEditForm from "./components/QuestionEditFormComponent";
import { fetchQuestions } from "./store/questions";

function App() {
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  },[])

  return (
    <>
      <Navbar />
        <Switch>

        <Route exact path="/">
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
              <QuestionIndex/>
          </Route>

          <Route exact path="/questions/ask">
              <QuestionForm/>
          </Route>

          <Route exact path="/questions/:questionId">
              <QuestionShow/>
          </Route>

          <Route exact path="/questions/:questionId/edit">
              <QuestionEditForm/>
          </Route>

          <Route exact path="/tags">
              <TagIndexComponent/>
          </Route>
            
      </Switch>
    </>
  );
}

export default App;