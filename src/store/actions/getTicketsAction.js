import { GET_TICKETS_STARTED, GET_TICKETS_COMPLETED, FETCH_END } from '../types';
import AviaApi from '../../avia-api/AviaApi';

const aviaApi = new AviaApi();

const getTicketsStarted = () => ({ type: GET_TICKETS_STARTED });
const getTicketsCompleted = (tickets) => ({ type: GET_TICKETS_COMPLETED, tickets });
const endFetch = () => ({ type: FETCH_END });
const getTickets = () => (dispatch) => {
  dispatch(getTicketsStarted());
  aviaApi
    .getIdAndTickets()
    .then(({ tickets, stop }) => {
      dispatch(getTicketsCompleted(tickets));
      if (!stop) dispatch(getTickets());
      else {
        dispatch(endFetch());
      }
    })
    .catch((err) => {
      if (err.message === '404err') return;
      if (err.message === '500err') dispatch(getTickets());
    });
};

export default getTickets;
