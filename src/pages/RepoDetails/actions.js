import {
  GET_SELECTED_REPO_PENDING,
  GET_SELECTED_REPO_RESOLVED,
  GET_SELECTED_REPO_REJECTED,
  GET_SELECTED_REPO_README_PENDING,
  GET_SELECTED_REPO_README_RESOLVED,
  GET_SELECTED_REPO_README_REJECTED,
  CLEAR_REDUCER,
  BASE_URL,
} from './constants';

const getSelectedRepoPending = () => ({
  type: GET_SELECTED_REPO_PENDING,
});

const getSelectedRepoResolved = data => ({
  type: GET_SELECTED_REPO_RESOLVED,
  data,
});

const getSelectedRepoRejected = error => ({
  type: GET_SELECTED_REPO_REJECTED,
  error,
});

export const getSelectedRepoData = ({ repoId, owner }) => dispatch => {
  let requestRemaining;
  dispatch(getSelectedRepoPending());

  fetch(`${BASE_URL}${owner}/${repoId}`)
    .then(res => {
      requestRemaining = res.headers.get('X-rateLimit-Remaining');
      return res.json();
    })
    .then(data => {
      dispatch(getSelectedRepoResolved({ ...data, requestRemaining }));
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch(getSelectedRepoRejected(error.message));
    });
};

const getSelectedRepoReadmePending = () => ({
  type: GET_SELECTED_REPO_README_PENDING,
});

const getSelectedRepoReadmeResolved = data => ({
  type: GET_SELECTED_REPO_README_RESOLVED,
  data,
});

const getSelectedRepoReadmeRejected = error => ({
  type: GET_SELECTED_REPO_README_REJECTED,
  error,
});

export const getSelectedRepoReadme = ({ repoId, owner }) => dispatch => {
  dispatch(getSelectedRepoReadmePending());
  fetch(`${BASE_URL}${owner}/${repoId}/readme`)
    .then(res => res.json())
    .then(data => {
      dispatch(getSelectedRepoReadmeResolved(data.content));
    })
    .catch(error => {
      dispatch(getSelectedRepoReadmeRejected(error));
    });
};

export const clearReducer = () => ({
  type: CLEAR_REDUCER,
});
