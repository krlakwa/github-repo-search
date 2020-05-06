import { combineReducers } from 'redux';

import reposReducer from 'pages/ReposSearch/reducer';
import repositoryReducer from 'pages/RepoDetails/reducer';

const reducer = combineReducers({ reposReducer, repositoryReducer });

export default reducer;
