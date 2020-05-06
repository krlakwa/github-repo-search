import {
  GET_SELECTED_REPO_PENDING,
  GET_SELECTED_REPO_RESOLVED,
  GET_SELECTED_REPO_REJECTED,
  GET_SELECTED_REPO_README_PENDING,
  GET_SELECTED_REPO_README_RESOLVED,
  GET_SELECTED_REPO_README_REJECTED,
  CLEAR_REDUCER,
} from './constants';

const initialState = {
  fetching: {
    selectedRepo: false,
    readmeContent: false,
  },
  selectedRepo: null,
  readmeContent: null,
  requestRemaining: null,
  errors: {
    selectedRepo: null,
    readmeContent: null,
  },
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_REPO_PENDING:
      return {
        ...state,
        fetching: { ...state.fetching, selectedRepo: true },
      };
    case GET_SELECTED_REPO_RESOLVED: {
      const {
        id,
        name,
        description,
        html_url: htmlUrl,
        fork: isFork,
        language,
        created_at: created,
        updated_at: updated,
        size,
        watchers_count: watchers,
        forks_count: forks,
        open_issues_count: openIssues,
        subscribers_count: subscribers,
        owner: { login, html_url: ownerUrl, avatar_url: avatarUrl } = {},
        requestRemaining,
      } = action.data;
      return {
        ...state,
        selectedRepo: {
          id,
          login,
          description,
          name,
          language,
          size,
          avatarUrl,
          htmlUrl,
          isFork,
          created,
          updated,
          repoStats: {
            forks,
            watchers,
            openIssues,
            subscribers,
          },
          ownerUrl,
        },
        requestRemaining,
        fetching: { ...state.fetching, selectedRepo: false },
      };
    }
    case GET_SELECTED_REPO_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, selectedRepo: action.error },
        fetching: { ...state.fetching, selectedRepo: false },
      };
    case GET_SELECTED_REPO_README_PENDING:
      return {
        ...state,
        fetching: { ...state.fetching, readmeContent: true },
      };
    case GET_SELECTED_REPO_README_RESOLVED:
      return {
        ...state,
        readmeContent: action.data,
        fetching: { ...state.fetching, readmeContent: false },
      };
    case GET_SELECTED_REPO_README_REJECTED:
      return {
        ...state,
        fetching: { ...state.fetching, readmeContent: false },
        errors: { ...state.errors, readmeContent: action.error },
      };
    case CLEAR_REDUCER: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default repositoryReducer;
