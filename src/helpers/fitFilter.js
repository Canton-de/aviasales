const fitFilter = (filterValue, ticketForwardStops, ticketBackwardStops) => {
  if (filterValue.includes('all')) return true;
  let fit;
  filterValue.forEach((value) => {
    const numberFilterValue = +value.slice(5);
    if (
      (ticketForwardStops.length === numberFilterValue && ticketBackwardStops.length <= numberFilterValue) ||
      (ticketForwardStops.length <= numberFilterValue && ticketBackwardStops.length === numberFilterValue)
    ) {
      fit = true;
    }
  });
  return fit
};

export default fitFilter