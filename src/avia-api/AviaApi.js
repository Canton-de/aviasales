import axios from 'axios';

class AviaApi {
  searchId = null;

  async getIdAndTickets() {
    if (this.searchId) {
      const tickets = await this.getTickets();
      return tickets;
    }
    const {data:{searchId}} = await axios.get(`https://front-test.beta.aviasales.ru/search`);
    this.searchId = searchId;
    const tickets = await this.getTickets();
    return tickets;
  }

  async getTickets() {
    const data = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${this.searchId}`);
    return data.data;
  }
  
}

export default AviaApi;
