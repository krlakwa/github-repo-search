import React from 'react';

import { ReactComponent as GithubOctocat } from 'assets/github-octocat.svg';

import './Githubplaceholder.scss';

const GithubPlaceholder = () => (
  <div className="Githubplaceholder__wrapper">
    <GithubOctocat className="Githubplaceholder__icon" />
  </div>
);

export default GithubPlaceholder;
