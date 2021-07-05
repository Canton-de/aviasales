import { CHANGE_MAIN_FILTER } from '../types';

const changeMainFilter = (filterValue) => ({ type: CHANGE_MAIN_FILTER, mainFilter: filterValue });

export default changeMainFilter;
