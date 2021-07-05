/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ticket from '../ticket/Ticket';
import styles from './tickets-list.module.scss';
import Loader from '../../Loader/Loader';
import getTicketsAction from '../../store/actions/getTicketsAction';
import addCountOfShowingTickets from '../../store/actions/addCountOfShowingTickets';

const makeLeftCount = (left) => {
  if (left >= 5) return '5 билетов';
  if (left >= 2) return `${left} билета`;
  if (left === 1) return '1 билет';
  return '0 билетов';
};

const TicketsList = ({ tickets, getTickets, isTicketsLoading, addTickets, showingTicketsCount }) => {
  useEffect(() => {
    getTickets();
  }, [getTickets]);

  let visibleTicketsCount = 0;
  tickets.forEach(({ isVisible }) => {
    if (isVisible) visibleTicketsCount += 1;
  });
  let counter = 0;
  if (tickets.length === 0) return <div style={{ color: 'green' }}>Билеты начинают загружаться</div>;
  return (
    <>
      {isTicketsLoading ? <Loader /> : null}
      <ul className={styles['tickets-list']}>
        {tickets.map(({ price, segments, carrier, id, isVisible }) => {
          if (counter >= showingTicketsCount) return null;
          const ticketForward = segments[0];
          const ticketBackward = segments[1];
          if (isVisible) {
            counter += 1;
            return (
              <Ticket
                price={price}
                ticketForward={ticketForward}
                ticketBackward={ticketBackward}
                carrier={carrier}
                key={id}
              />
            );
          }
          return null;
        })}
        {counter === 0 ? (
          <div style={{ color: 'tomato' }}>Рейсов, подходящих под заданные фильтры, не найдено</div>
        ) : counter < visibleTicketsCount ? (
          <button onClick={addTickets} className={styles.button} type="button">
            Показать еще {makeLeftCount(visibleTicketsCount - counter)}!
          </button>
        ) : null}
      </ul>
    </>
  );
};

TicketsList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTickets: PropTypes.func.isRequired,
  isTicketsLoading: PropTypes.bool.isRequired,
  addTickets: PropTypes.func.isRequired,
  showingTicketsCount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ tickets, isTicketsLoading, showingTicketsCount }) => ({
  tickets,
  isTicketsLoading,
  showingTicketsCount,
});
export default connect(mapStateToProps, { getTickets: getTicketsAction, addTickets: addCountOfShowingTickets })(
  TicketsList
);
