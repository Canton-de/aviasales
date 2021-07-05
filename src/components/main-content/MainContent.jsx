import React from 'react';
import CheckboxFilter from '../checkbox-filter/CheckboxFilter';
import styles from './main-content.module.scss';
import MainFilter from '../main-filter/MainFilter';
import TicketsList from '../tickets-list/TicketsList';

const MainContent = () => (
  <div className={styles['flex-wrapper']}>
    <CheckboxFilter />
    <div className={styles['flex-column']}>
      <MainFilter />
      <TicketsList />
    </div>
  </div>
);

export default MainContent;
