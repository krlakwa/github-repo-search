import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import ErrorBoundary from 'components/ErrorBoundary';
import { getPaginationValues } from 'helpers';
import { useDispatchedActions } from 'hooks';
import {
  getReposData as getReposAction,
  clearRepos as clearReposAction,
  clearReducer,
} from './actions';
import { BASE_URL, REQUEST_LIMIT_EXCEEDED } from './constants';
import ReposList from './components/ReposList';

import './ReposSearch.scss';

const ReposSearch = () => {
  const [search, setSearch] = useState('');
  const { repos, requestDuration, paginationUrl, requestRemaining, fetching } = useSelector(
    ({ reposReducer }) => ({
      repos: reposReducer.repos,
      requestDuration: reposReducer.requestDuration,
      paginationUrl: reposReducer.paginationUrl,
      requestRemaining: reposReducer.requestRemaining,
      fetching: reposReducer.fetching.repos,
    }),
    shallowEqual
  );

  const { getRepos, clearRepos } = useDispatchedActions({
    getRepos: getReposAction,
    clearRepos: clearReposAction,
  });

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  useEffect(() => {
    if (search) {
      const searchUrl = `${BASE_URL}${search}`;
      getRepos(searchUrl);
    } else {
      clearRepos();
    }
    return () => clearReducer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <ErrorBoundary>
      <div className="ReposSearch">
        <div className="ReposSearch__input-wrapper">
          <input
            className="ReposSearch__input"
            type="text"
            value={search}
            placeholder="Type repository name"
            onChange={handleSearch}
          />
        </div>
        {!fetching && (
          <div className="ReposSearch__pagination-wrapper">
            <div className="ReposSearch__pagination-buttons-wrapper">
              {paginationUrl &&
                paginationUrl.map(item => {
                  const [url, text] = getPaginationValues(item);
                  return (
                    <button
                      className="RepoSearch__pagination-button"
                      label="button"
                      key={text}
                      type="button"
                      onClick={() => getRepos(url)}
                    >
                      {text}
                    </button>
                  );
                })}
            </div>
            {requestDuration && requestRemaining !== REQUEST_LIMIT_EXCEEDED && (
              <p className="ReposSearch__duration-paragraph">{`Results displayed in ${requestDuration}`}</p>
            )}
          </div>
        )}
        {requestRemaining === REQUEST_LIMIT_EXCEEDED ? (
          <h3 className="RepoSearch_limit-info">
            API rate limit exceeded. You need to wait a minute.
          </h3>
        ) : (
          <ReposList fetching={fetching} repos={repos} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ReposSearch;
