import React from "react";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Nav";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import UserPage from "./components/UserShow";
import SplashPage from "./components/SplashPage";
import UsersPage from "./components/UsersIndexPage";

function App() {
  return (
    <>
      <Navbar />
      <Navigation />
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
      </Switch>
    </>
  );
}

export default App;