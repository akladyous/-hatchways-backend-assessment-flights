import Ticket from './Ticket.js'
import Cache from '../service/Cache.js';
import { $ } from '../data/util.js'

class TicketGenerator extends Cache {
    constructor() {
        super()
        this.#airline = this.#airline
        this.ticketId = ++this.constructor.#counter
    };
    randomFlightNumber() {
        let filightNumbers = this.airlines.map(a => a.flightNumber)
        this.flightNumber = $().sample(filightNumbers)
        return this
    }
    randomFlightDate() {
        const airline = this.airlines.filter(a => a.flightNumber === this.flightNumber)
        this.flightDate = $().randomDate(airline.schedule.startDate, airline.schedule.endDate)
        return this
    }
    randomSeatNumber() {
        let airlineSeats = this.airlines.filter(a => a.flightNumber === this.flightNumber)
        this.seatNumber = $().sample(airlineSeats)
        return this;
    }
    ticketCost() {
        this.ticketCost = $().random(100, 2000)
        return this
    }
    build() {
        return new Ticket(this)
    };
};

export default TicketGenerator;