import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import GithubPlaceholder from 'components/GithubPlaceholder';
import RepoDetails from 'pages/RepoDetails';
import ReposSearch from 'pages/ReposSearch';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path="/repos/:owner/:repoId">
              <RepoDetails />
            </Route>
            <Route path="/" exact>
              <ReposSearch />
            </Route>
            <Route>
              <div className="App__page-not-found">
                <div className="App__githubPlaceholder-wrapper">
                  <GithubPlaceholder />
                </div>
                <h1>Page does not exist.</h1>
              </div>
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
