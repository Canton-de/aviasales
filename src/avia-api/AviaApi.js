
class AviaApi {

  searchId = null;

  async getIdAndTickets() {
    let tickets
    if(this.searchId) {tickets = await this.getTickets();
    return tickets}
    const response = await fetch(`https://front-test.beta.aviasales.ru/search`);
    const res = await response.json()
    const id = res.searchId
    this.searchId = id
    tickets = this.getTickets()
    return tickets    
  }

  async getTickets() {
    const response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${this.searchId}`);
    if(response.status===500) throw new Error('500err');
    if (!response.ok) throw new Error('404err');
    const tickets = await response.json();
    return tickets
  }
}

export default AviaApi