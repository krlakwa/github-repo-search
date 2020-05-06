/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GithubPlaceholder from 'components/GithubPlaceholder';
import './ErrorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;
    return hasError ? fallback : children;
  }
}

ErrorBoundary.defaultProps = {
  fallback: (
    <div className="ErrorBoundary">
      <div className="ErrorBoundary__placeholder-wrapper">
        <GithubPlaceholder />
      </div>
      <h1>Something obviously went wrong.</h1>
    </div>
  ),
  children: React.createElement('div'),
};

ErrorBoundary.propTypes = {
  fallback: PropTypes.element,
  children: PropTypes.element,
};

export default ErrorBoundary;
