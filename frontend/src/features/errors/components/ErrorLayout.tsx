import React from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../selectors';

export const ErrorLayout: React.FC = () => {
  const title = useSelector(selectors.errorTitle);
  const message = useSelector(selectors.errorMessage);
  const code = useSelector(selectors.errorCode);

  return (
    <>
      <h1>{title}</h1>
      <p>{`${code} - ${message}`}</p>
    </>
  );
};
