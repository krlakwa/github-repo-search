import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import ReposListItem from '../ReposListItem';

import './ReposList.scss';

const ReposList = ({ repos, fetching }) => {
  return (
    <>
      {!fetching ? (
        <div className="ReposList">
          {(repos || []).map(repo => (
            <ReposListItem key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

ReposList.defaultProps = {
  repos: [],
  fetching: false,
};

ReposList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      login: PropTypes.string,
      url: PropTypes.string,
      avatar_url: PropTypes.string,
    })
  ),
  fetching: PropTypes.bool,
};

export default ReposList;
