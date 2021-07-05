import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './checkbox-filter.module.scss';
import changeCheckboxFilterAction from '../../store/actions/changeCkeckboxFilter';

const CheckboxFilterComponent = ({ checkboxFilter, changeCheckboxFilter }) => {
  const checkboxOptions = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  return (
    <div className={styles['rounded-block']}>
      <div className={styles.title}>количество пересадок</div>
      <div>
        {checkboxOptions.map((option, index) => {
          const optionValue = index === 0 ? 'all' : `value${index - 1}`;
          return (
            <div key={option}>
              <label className={styles.label}>
                <input
                  value={optionValue}
                  onChange={() => changeCheckboxFilter(optionValue)}
                  checked={checkboxFilter.includes(optionValue)}
                  type="checkbox"
                />
                {option}
                <div className={styles.checkbox} />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CheckboxFilterComponent.propTypes = {
  checkboxFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeCheckboxFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ checkboxFilter }) => ({
  checkboxFilter,
});

export default connect(mapStateToProps, { changeCheckboxFilter: changeCheckboxFilterAction })(CheckboxFilterComponent);
