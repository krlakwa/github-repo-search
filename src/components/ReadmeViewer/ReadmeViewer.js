import React from 'react';
import PropTypes from 'prop-types';
import snarkdown from 'snarkdown';
import { decodeBase64 } from 'helpers';

const ReadmeViewer = ({ content }) => {
  const decodedContent = decodeBase64(content || '');
  const contentToRender = snarkdown(decodedContent);
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: contentToRender }} />;
};

ReadmeViewer.defaultProps = {
  content: '',
};

ReadmeViewer.propTypes = {
  content: PropTypes.string,
};

export default ReadmeViewer;
