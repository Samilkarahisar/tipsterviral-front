import { IconFallbackImage } from '@/res/icons';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  src: string;
  alt: string;
  className: string;
  iconClassName: string;
}

const LazyImage: React.FC<Props> = ({ src, alt, className, iconClassName }) => {
  const [imageError, setImageError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onImgError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  return !imageError ? (
    <LazyLoadImage
      useIntersectionObserver={false}
      onError={onImgError}
      src={src}
      alt={alt}
      className={`${className} ${
        loaded && !imageError
          ? ''
          : 'animate-pulse bg-gray-200 dark:bg-dark-gray3 rounded-md w-full h-full'
      }`}
      afterLoad={() => setLoaded(true)}
    />
  ) : (
    <IconFallbackImage className={`text-gray2 ${iconClassName}`} />
  );
};

export default LazyImage;
