import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

import GithubPlaceholder from 'components/GithubPlaceholder';
import './UserAvatar.scss';

const Img = lazy(() => import('components/Image'));
const UserAvatar = ({ src, alt }) => {
  return (
    <Suspense fallback={<GithubPlaceholder />}>
      <Img className="UserAvatar" src={src} alt={alt} />
    </Suspense>
  );
};

UserAvatar.defaultProps = {
  src: '',
  alt: '',
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default UserAvatar;
