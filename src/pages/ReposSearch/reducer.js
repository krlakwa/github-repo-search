import {
  GET_REPOS_PENDING,
  GET_REPOS_RESOLVED,
  GET_REPOS_REJECTED,
  CLEAR_REPOS_LIST,
  CLEAR_REDUCER,
} from './constants';

const initialState = {
  fetching: {
    repos: false,
  },
  repos: null,
  reposAmount: null,
  requestDuration: null,
  paginationUrl: null,
  requestRemaining: null,
  error: null,
};

const reposReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOS_PENDING:
      return {
        ...state,
        fetching: { ...state.fetching, repos: true },
      };
    case GET_REPOS_RESOLVED: {
      const {
        items = [],
        total_count: reposAmount,
        requestDuration,
        paginationUrl,
        requestRemaining,
      } = action.data;
      const repos = items.map(repo => {
        const {
          id,
          name,
          full_name: fullName,
          created_at: created,
          updated_at: lastUpdated,
          owner: { login, avatar_url: avatarUrl },
        } = repo;

        return {
          id,
          name,
          fullName,
          created,
          lastUpdated,
          owner: {
            login,
            avatarUrl,
          },
        };
      });

      return {
        ...state,
        fetching: { ...state.fetching, repos: false },
        repos,
        reposAmount,
        requestDuration,
        requestRemaining,
        paginationUrl: paginationUrl ? paginationUrl.split(', ') : null,
      };
    }
    case GET_REPOS_REJECTED:
      return {
        ...initialState,
        fetching: { ...state.fetching, repos: false },
        error: action.error,
      };
    case CLEAR_REPOS_LIST:
      return {
        ...state,
        repos: null,
        requestDuration: null,
        paginationUrl: null,
        requestRemaining: null,
      };

    case CLEAR_REDUCER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reposReducer;
