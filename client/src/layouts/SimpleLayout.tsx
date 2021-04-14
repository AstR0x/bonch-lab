import React from 'react';
import { useSelector } from 'react-redux';

import { Header } from '@common/components';
import { ErrorLayout, selectors as errorSelectors } from '@features/errors';
import { Notification } from '@features/notification';

/**
 * Макет без боковой панели
 *
 * @returns react-элемент
 */
export const SimpleLayout: React.FC = ({ children }) => {
  const errorExist = useSelector(errorSelectors.isErrorExist);

  return (
    <div>
      <Header />
      <main>{errorExist ? <ErrorLayout /> : children}</main>
      <Notification />
    </div>
  );
};
