import { CHANGE_CHECKBOX_FILTER } from '../types';

const changeCheckboxFilter = (filterValue) => ({ type: CHANGE_CHECKBOX_FILTER, checkboxFilter: filterValue });

export default changeCheckboxFilter;
