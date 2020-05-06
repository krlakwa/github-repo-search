import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { getPaginationValues } from 'helpers';
import { useDispatchedActions } from 'hooks';
import {
  getReposData as getReposAction,
  clearRepos as clearReposAction,
  clearReducer,
} from './actions';
import { BASE_URL } from './constants';
import ReposList from './ReposList';

import './ReposSearch.scss';

const ReposSearch = () => {
  const [search, setSearch] = useState('');
  const { repos, requestDuration, paginationUrl, fetching } = useSelector(
    ({ reposReducer }) => ({
      repos: reposReducer.repos,
      requestDuration: reposReducer.requestDuration,
      paginationUrl: reposReducer.paginationUrl,
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
    <div className="ReposSearch">
      <div className="ReposSearch__input-wrapper">
        <input
          className="ReposSearch__input"
          type="text"
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
          {requestDuration && (
            <p className="ReposSearch__duration-paragraph">{`Results displayed in ${requestDuration}`}</p>
          )}
        </div>
      )}
      <ReposList fetching={fetching} repos={repos} />
    </div>
  );
};

export default ReposSearch;
