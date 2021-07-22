const sortTickets = (tickets, sortFilter) => {
  const ticketsCopy = JSON.parse(JSON.stringify(tickets));
  switch (sortFilter) {
    case 'speed':
      return ticketsCopy.sort(
        (ticket1, ticket2) =>
          ticket1.segments[0].duration +
          ticket1.segments[1].duration -
          (ticket2.segments[0].duration + ticket2.segments[1].duration)
      );
    default:
      return ticketsCopy.sort((ticket1, ticket2) => ticket1.price - ticket2.price);
  }
};

export default sortTickets