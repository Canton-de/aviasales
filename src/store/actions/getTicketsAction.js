import { GET_TICKETS_STARTED, GET_TICKETS_COMPLETED, FETCH_END } from '../types';
import AviaApi from '../../avia-api/AviaApi';

const aviaApi = new AviaApi();

const getTicketsStarted = () => ({ type: GET_TICKETS_STARTED });
const getTicketsCompleted = (tickets) => ({ type: GET_TICKETS_COMPLETED, tickets });
const endFetch = () => ({ type: FETCH_END });
const getTickets = () => async (dispatch) => {
  dispatch(getTicketsStarted());
  try {
    const { tickets, stop } = await aviaApi.getIdAndTickets();
    dispatch(getTicketsCompleted(tickets));
    if (!stop) dispatch(getTickets());
    else {
      dispatch(endFetch());
    }
  } catch (err) {
    if (err.response.status === 404) return;
    if (err.response.status === 500) dispatch(getTickets());
  }
};

export default getTickets;
