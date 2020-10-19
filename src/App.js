import React from "react";
import { FormProvider } from "./FormContext";
import Home from "./Home";
import "./Sass/App.scss";
import { UniversityProvider } from "./UniversityContext";
import { Route, Switch, useLocation } from "react-router-dom";
import ScoreResult from "./ScoreResult";
import { AnimatePresence } from "framer-motion";

function App() {
  const routeLocation = useLocation();

  return (
    <UniversityProvider>
      <FormProvider>
        <div className="App">
          <header>
            <h1>checkmyaid</h1>
          </header>
          <AnimatePresence exitBeforeEnter>
            <Switch location={routeLocation} key={routeLocation.key}>
              <Route path="/" component={Home} exact />
              <Route path="/result" component={ScoreResult} exact />
            </Switch>
          </AnimatePresence>
          <footer>
            <div className="circle2"></div>
            <a
              href="https://collegescorecard.ed.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source of Data
            </a>
            <a
              href="https://github.com/GameDog9988/check-my-aid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </footer>
        </div>
      </FormProvider>
    </UniversityProvider>
  );
}

export default App;
