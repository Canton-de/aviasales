import changeVisibleTickets from '../helpers/changeVisibleTickets';
import sortTickets from '../helpers/sortTickets';
import {
  CHANGE_CHECKBOX_FILTER,
  CHANGE_MAIN_FILTER,
  GET_TICKETS_STARTED,
  GET_TICKETS_COMPLETED,
  FETCH_END,
  ADD_COUNT_OF_SHOWING_TICKETS,
} from './types';

const allCheckboxVariants = ['all', 'value0', 'value1', 'value2', 'value3'];





const initialState = {
  mainFilter: 'price',
  checkboxFilter: allCheckboxVariants,
  isTicketsLoading: false,
  tickets: [],
  showingTicketsCount: 5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MAIN_FILTER:
      if (state.mainFilter !== action.mainFilter) {
        const sortedTickets = sortTickets(state.tickets, action.mainFilter);
        return { ...state, mainFilter: action.mainFilter, tickets: sortedTickets };
      }
      return state;
    case CHANGE_CHECKBOX_FILTER: {
      if (action.checkboxFilter === allCheckboxVariants[0]) {
        if (!state.checkboxFilter.includes(allCheckboxVariants[0])) {
          const curTickets = changeVisibleTickets(state.tickets, allCheckboxVariants);
          return {
            ...state,
            checkboxFilter: allCheckboxVariants,
            tickets: curTickets,
          };
        }
        return { ...state, checkboxFilter: [], tickets: changeVisibleTickets(state.tickets, []) };
      }
      if (state.checkboxFilter.includes(action.checkboxFilter)) {
        const curFilter = state.checkboxFilter.filter(
          (checkboxValue) => checkboxValue !== action.checkboxFilter && checkboxValue !== 'all'
        );
        const curTickets = changeVisibleTickets(state.tickets, curFilter);
        return {
          ...state,
          checkboxFilter: curFilter,
          tickets: curTickets,
        };
      }
      if (state.checkboxFilter.length === allCheckboxVariants.length - 2) {
        const curFilter = allCheckboxVariants;
        const curTickets = changeVisibleTickets(state.tickets, curFilter);
        return { ...state, checkboxFilter: curFilter, tickets: curTickets };
      }
      const curTickets = changeVisibleTickets(state.tickets, [...state.checkboxFilter, action.checkboxFilter]);
      return {
        ...state,
        checkboxFilter: [...state.checkboxFilter, action.checkboxFilter],
        tickets: curTickets,
      };
    }
    case GET_TICKETS_STARTED:
      return { ...state, isTicketsLoading: true };
    case GET_TICKETS_COMPLETED: {
      const newTickets = sortTickets(
        [
          ...state.tickets,
          ...changeVisibleTickets(
            action.tickets.map((ticket) => ({
              ...ticket,
              id: `${new Date().getTime()}${ticket.price}${ticket.carrier}${ticket.segments[0].date}`,
              isVisible: true,
            })),
            state.checkboxFilter
          ),
        ],
        state.mainFilter
      );
      return {
        ...state,
        tickets: newTickets,
      };
    }
    case ADD_COUNT_OF_SHOWING_TICKETS:
      return { ...state, showingTicketsCount: state.showingTicketsCount + 5 };
    case FETCH_END:
      return { ...state, isTicketsLoading: false };
    default:
      return state;
  }
};

export default reducer;
