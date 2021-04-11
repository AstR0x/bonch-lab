import React from 'react';

/**
 * Компонент глобального лоадера
 *
 * @reactProps {React.Element}
 * @returns {React.FC} - компонент глобального лоадера
 */
export const GlobalLoader: React.FC = ({ children }) => {
  return <div>{children}</div>;
};
