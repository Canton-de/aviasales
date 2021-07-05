import React from 'react';
import PropTypes from 'prop-types';
import styles from './ticket.module.scss';

const stopsToString = (stopsCount) => {
  if (stopsCount === 0) return 'ПЕРЕСАДОК';
  if (stopsCount === 1) return 'ПЕРЕСАДКА';
  return 'ПЕРЕСАДКИ';
};
const makeFlyDate = (departureDateString, flyTime) => {
  const departureDate = new Date(departureDateString);
  const arrivalDate = new Date(departureDate.getTime() + flyTime * 60e3);
  const departureHours = `0${departureDate.getHours()}`.slice(-2);
  const departureMinutes = `0${departureDate.getMinutes()}`.slice(-2);
  const arrivalHours = `0${arrivalDate.getHours()}`.slice(-2);
  const arrivalMinutes = `0${arrivalDate.getMinutes()}`.slice(-2);
  return `${departureHours}:${departureMinutes} - ${arrivalHours}:${arrivalMinutes}`;
};
const Ticket = ({ price, ticketForward, ticketBackward, carrier }) => {
  const {
    origin: originForward,
    destination: destinationForward,
    duration: durationForward,
    stops: stopsForward,
    date: dateForward,
  } = ticketForward;
  const {
    origin: originBackward,
    destination: destinationBackward,
    duration: durationBackward,
    stops: stopsBackward,
    date: dateBackward,
  } = ticketBackward;
  const forwardFlyDate = makeFlyDate(dateForward, durationForward);
  const backwardFlyDate = makeFlyDate(dateBackward, durationBackward);
  const priceString = String(price);
  const separatedPrice = priceString.split(/([0-9]*)([0-9]{3})/).join(' ');
  return (
    <div className={styles.ticket}>
      <div className={styles['ticket-price']}>{separatedPrice} Р</div>
      <ul className={styles['ticket-items']}>
        <li className={styles['ticket-item']}>
          <div className={styles.title}>{`${originForward} - ${destinationForward}`}</div>
          <div className={styles.subtitle}>{forwardFlyDate}</div>
          <div className={styles.title}>{`${originBackward} - ${destinationBackward}`}</div>
          <div className={styles.subtitle}>{backwardFlyDate}</div>
        </li>
        <li className={styles['ticket-item']}>
          <div className={styles.title}>В пути</div>
          <div className={styles.subtitle}>{`${Math.floor(durationForward / 60)}Ч ${durationForward % 60} М`}</div>
          <div className={styles.title}>В пути</div>
          <div className={styles.subtitle}>{`${Math.floor(durationBackward / 60)}Ч ${durationBackward % 60}`}</div>
        </li>
        <li className={styles['ticket-item']}>
          <div className={styles.title}>
            {stopsForward.length} {stopsToString(stopsForward.length)}
          </div>
          <div className={styles.subtitle}>{stopsForward.join(', ')}</div>
          <div className={styles.title}>
            {stopsBackward.length} {stopsToString(stopsBackward.length)}
          </div>
          <div className={styles.subtitle}>{stopsBackward.join(', ')}</div>
        </li>
      </ul>
      <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="company logo" className={styles.logo} />
    </div>
  );
};
const ticketShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
});
Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  ticketForward: ticketShape.isRequired,
  ticketBackward: ticketShape.isRequired,
};

export default Ticket;
