import {
  GET_SELECTED_REPO_PENDING,
  GET_SELECTED_REPO_RESOLVED,
  GET_SELECTED_REPO_REJECTED,
  GET_SELECTED_REPO_README_PENDING,
  GET_SELECTED_REPO_README_RESOLVED,
  GET_SELECTED_REPO_README_REJECTED,
  CLEAR_REDUCER,
} from './constants';

const baseUrl = 'https://api.github.com/repos/';

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
  dispatch(getSelectedRepoPending());

  fetch(`${baseUrl}${owner}/${repoId}`)
    .then(res => res.json())
    .then(data => {
      dispatch(getSelectedRepoResolved(data));
    })
    .catch(error => dispatch(getSelectedRepoRejected(error)));
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
  fetch(`${baseUrl}${owner}/${repoId}/readme`)
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
