import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './main-filter.module.scss';
import changeMainFilterAction from '../../store/actions/changeMainFilter';

const MainFilter = ({ mainFilter, changeMainFilter }) => (
  <div className={styles['flex-wrapper']}>
    <button
      type="button"
      onClick={() => changeMainFilter('price')}
      className={cn(styles.button, { [styles.active]: mainFilter === 'price' })}
    >
      Самый дешевый
    </button>
    <button
      type="button"
      onClick={() => changeMainFilter('speed')}
      className={cn(styles.button, { [styles.active]: mainFilter === 'speed' })}
    >
      Самый быстрый
    </button>
  </div>
);
MainFilter.propTypes = {
  mainFilter: PropTypes.oneOf(['speed', 'price']).isRequired,
  changeMainFilter: PropTypes.func.isRequired,
};
const mapStateToProps = ({ mainFilter }) => ({ mainFilter });
export default connect(mapStateToProps, { changeMainFilter: changeMainFilterAction })(MainFilter);
