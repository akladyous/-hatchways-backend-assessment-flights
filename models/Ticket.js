class Ticket {
    constructor(builder = {}) {
        this.flightDate = builder.flightDate
        this.flightNumber = builder.flightNumber
        this.seatNumber = builder.seatNumber
        this.ticketCost = builder.ticketCost
    }
    toString() {
        return JSON.stringify(this);
    }

};
export default Ticket;