import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => (
  <>
    <h1>Home page!!</h1>
    <Link to="/about">to about page</Link>
  </>
);
