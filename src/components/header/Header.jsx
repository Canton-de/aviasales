import React from 'react';
import logo from '../../img/logo.png';
import styles from './header.module.scss';

const Header = () => (
  <>
    <div className={styles.header}>
      <img src={logo} width="60" alt="logo" />
    </div>
  </>
);

export default Header;
