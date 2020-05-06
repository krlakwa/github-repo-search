import { getDuration } from 'helpers';
import {
  GET_REPOS_PENDING,
  GET_REPOS_RESOLVED,
  GET_REPOS_REJECTED,
  CLEAR_REPOS_LIST,
  CLEAR_REDUCER,
} from './constants';

let abortController;

const getReposPending = () => ({
  type: GET_REPOS_PENDING,
});

const getReposResolved = data => ({
  type: GET_REPOS_RESOLVED,
  data,
});

const getReposRejected = error => ({
  type: GET_REPOS_REJECTED,
  error,
});

export const getReposData = url => dispatch => {
  let paginationUrl;
  let requestRemaining;
  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();
  dispatch(getReposPending());
  const startTime = new Date().getTime();
  fetch(url, {
    signal: abortController.signal,
  })
    .then(res => {
      requestRemaining = res.headers.get('X-RateLimit-Remaining');
      paginationUrl = res.headers.get('Link');
      return res.json();
    })
    .then(data => {
      const endTime = new Date().getTime();
      const requestDuration = getDuration(startTime, endTime);
      abortController = undefined;

      dispatch(getReposResolved({ ...data, requestDuration, paginationUrl, requestRemaining }));
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      const wasAborted = error.code === 20;
      if (!wasAborted) dispatch(getReposRejected(error.message));
    });
};

export const clearRepos = () => ({
  type: CLEAR_REPOS_LIST,
});

export const clearReducer = () => ({
  type: CLEAR_REDUCER,
});
