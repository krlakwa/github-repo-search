import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getRelativeDate } from 'helpers';
import './ReposListItem.scss';

// const UserAvatar = lazy(() => import('components/UserAvatar'));
import UserAvatar from 'components/UserAvatar';

const ReposListItem = ({ repo }) => {
  const {
    name,
    created,
    lastUpdated,
    owner: { login, avatarUrl },
  } = repo;
  return (
    <Link to={`repos/${login}/${name}`} className="ReposListItem__box">
      <div className="ReposListItem__img">
        <UserAvatar src={avatarUrl} alt={login} />
      </div>
      <div className="ReposListItem__text">
        <h5 className="ReposListItem__title">{repo.name}</h5>
        <p className="ReposListItem__author">{`Created by: ${login}`}</p>
        <p className="ReposListItem__info">{`Created ${getRelativeDate(created)}`}</p>
        <p className="ReposListItem__info">{`Last modified: ${getRelativeDate(lastUpdated)}`}</p>
      </div>
    </Link>
  );
};

ReposListItem.defaultProps = {
  repo: {},
};

ReposListItem.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string,
    created: PropTypes.string,
    lastUpdated: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

export default ReposListItem;
