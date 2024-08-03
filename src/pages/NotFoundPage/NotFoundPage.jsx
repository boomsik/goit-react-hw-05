import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Страница не найдена</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
