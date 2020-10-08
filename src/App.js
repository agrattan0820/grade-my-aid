import React from "react";

import { FormProvider } from "./FormContext";
import Home from "./Home";
import "./Sass/App.scss";

import { UniversityProvider } from "./UniversityContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScoreResult from "./ScoreResult";

function App() {
  return (
    <Router>
      <UniversityProvider>
        <FormProvider>
          <div className="App">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/result" component={ScoreResult} exact />
            </Switch>
          </div>
        </FormProvider>
      </UniversityProvider>
    </Router>
  );
}

export default App;
