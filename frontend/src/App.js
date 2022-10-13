import React from "react";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Nav";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./SplashPage";

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
      </Switch>
    </>
  );
}

export default App;