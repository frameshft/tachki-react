import React from 'react';
import { Link } from 'react-router';

const PageNotFound = () => (
  <div className='error-404'>
    { /* eslint-disable global-require */ }
    <img src={ require('../../../img/404.svg') } alt='Ошибка 404' />
    { /* eslint-enable global-require */ }
    <h3>Страница не найдена</h3>
    <Link to='/'>Перейти на Главную</Link>
  </div>
);

export default PageNotFound;
