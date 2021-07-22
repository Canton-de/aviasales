import fitFilter from "./fitFilter";

const changeVisibleTickets = (tickets, checkboxFilter) =>
  tickets.map((ticket) => {
    const ticketForward = ticket.segments[0];
    const ticketBackward = ticket.segments[1];
    if (fitFilter(checkboxFilter, ticketForward.stops, ticketBackward.stops)) {
      return { ...ticket, isVisible: true };
    }
    return { ...ticket, isVisible: false };
  });
export default changeVisibleTickets