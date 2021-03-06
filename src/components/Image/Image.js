import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { suspensify, fetchResource } from 'utils';

import './Image.scss';

const Image = ({ src, alt }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const getImageResource = async () => {
      const img = await suspensify(
        fetchResource(src)
          .then(res => res.blob())
          .then(blob => URL.createObjectURL(blob))
      );
      setImage(img);
    };
    getImageResource();
  }, [src]);

  return image ? <img className="Image" src={image.read()} alt={alt} /> : null;
};

Image.defaultProps = {
  src: '',
  alt: '',
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
