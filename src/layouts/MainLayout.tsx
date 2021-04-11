import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { Header, Footer } from '@common/components';
import { GlobalLoader } from '@features/loading';

import { ErrorLayout, selectors as errorSelectors } from '@features/errors';

type LayoutProp = {
  children: ReactNode | ReactNode[];
};

/**
 * ### Базовый макет страницы
 *
 * @returns {JSX.Element} - Базовый макет страницы
 */
export const MainLayout: React.FC<LayoutProp> = ({ children }) => {
  const errorExist = useSelector(errorSelectors.isErrorExist);

  return (
    <GlobalLoader>
      <Header />
      <div>
        <main>{errorExist ? <ErrorLayout /> : children}</main>
      </div>
      <Footer />
    </GlobalLoader>
  );
};
