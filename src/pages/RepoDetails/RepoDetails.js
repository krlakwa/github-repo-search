import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

import GithubPlaceholder from 'components/GithubPlaceholder';
import ReadmeViewer from 'components/ReadmeViewer';
import UserAvatar from 'components/UserAvatar';
import Spinner from 'components/Spinner';
import { getRelativeDate } from 'helpers';
import { useDispatchedActions } from 'hooks';

import {
  getSelectedRepoData as getSelectedRepoDataAction,
  getSelectedRepoReadme as getSelectedRepoReadmeAction,
  clearReducer as clearReducerAction,
} from './actions';

import './RepoDetails.scss';

const RepoDetails = () => {
  const { repoId, owner } = useParams();
  const { getSelectedRepoData, getSelectedRepoReadme, clearReducer } = useDispatchedActions({
    getSelectedRepoData: getSelectedRepoDataAction,
    getSelectedRepoReadme: getSelectedRepoReadmeAction,
    clearReducer: clearReducerAction,
  });
  const { selectedRepo, readmeContent, requestRemaining } = useSelector(
    ({ repositoryReducer }) => ({
      selectedRepo: repositoryReducer.selectedRepo,
      readmeContent: repositoryReducer.readmeContent,
      requestRemaining: repositoryReducer.requestRemaining,
    }),
    shallowEqual
  );
  const {
    name,
    login,
    description,
    language,
    size,
    avatarUrl,
    htmlUrl,
    created,
    updated,
    repoStats,
    ownerUrl,
  } = selectedRepo || {};

  useEffect(() => {
    getSelectedRepoData({ repoId, owner });
    getSelectedRepoReadme({ repoId, owner });
    return () => clearReducer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (requestRemaining === '0') {
    return (
      <main className="RepoDetails">
        <h3 className="RepoSearch_limit-info">API rate limit exceeded. You need to wait.</h3>
      </main>
    );
  }

  return (
    <main className="RepoDetails">
      <section className="RepoDetails__repo">
        <div className="RepoDetails__avatar">
          {avatarUrl ? <UserAvatar src={avatarUrl} alt={login} /> : <GithubPlaceholder />}
        </div>
        <div className="RepoDetails__repo-details">
          <h2>{name}</h2>
          <div className="RepoDetails__repo-details-content">
            <div className="RepoDetails__repo-details-column">
              <p>
                <span className="RepoDetails__repo-details-title">Created by:</span>
                {login}
              </p>
              <p>
                <span className="RepoDetails__repo-details-title">Repository Url:</span>
                <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
                  {htmlUrl}
                </a>
              </p>
              <p>
                <span className="RepoDetails__repo-details-title">Language:</span>
                {language}
              </p>
            </div>
            <div className="RepoDetails__repo-details-column">
              <p>
                <span className="RepoDetails__repo-details-title">Owner Url:</span>
                <a href={ownerUrl} target="_blank" rel="noopener noreferrer">
                  {ownerUrl}
                </a>
              </p>
              <p>
                <span className="RepoDetails__repo-details-title">Created:</span>
                {getRelativeDate(created)}
              </p>
              <p>
                <span className="RepoDetails__repo-details-title">Last change:</span>
                {getRelativeDate(updated)}
              </p>
              <p>
                <span className="RepoDetails__repo-details-title">Size:</span>
                {size}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="RepoDetails__bio">
        <p className="RepoDetails__description">
          <span className="RepoDetails__repo-details-title">Repository description:</span>
          {description || 'No data'}
        </p>
      </section>
      <section className="RepoDetails__details">
        <div className="RepoDetails__stats">
          {Object.entries(repoStats || {}).map(([title, value]) => {
            const formattedTitle = title === 'openIssues' ? 'Open issues' : title;
            return (
              <article key={title} className="RepoDetails__cell">
                <p className="RepoDetails__cell-title">{formattedTitle}</p>
                <p className="RepoDetails__cell-content">{value}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="RepoDetails_readme">
        {readmeContent ? <ReadmeViewer content={readmeContent} /> : <Spinner />}
      </section>
    </main>
  );
};

export default RepoDetails;
