import Ticket from "./Ticket.js";
import { $ } from "../helpers/util.js";
import { cache } from "../service/cache.js";

class TicketBuilder {
    static #counter = 0;
    constructor() {
        this.ticketId = ++this.constructor.#counter;
    }
    setTicketId(id) {
        this.ticketId = id;
        return this;
    }
    setFlightDate(date) {
        this.flightDate = date;
        return this;
    }
    setFlightNumber(flightNumber) {
        this.flightNumber = flightNumber;
        return this;
    }
    setSeatNumber(seatNumber) {
        this.seatNumber = seatNumber;
        return this;
    }
    setTicketCost(ticketCost) {
        this.ticketCost = ticketCost;
        return this;
    }
    build() {
        return new Ticket(this);
    }
    async validateTicket() {
        try {
            const results = await Promise.all([
                this.isValidTicketDate(),
                this.isValidTicketID(),
                this.isValidSeatNum(),
            ]);
            if (results.every(Boolean)) {
                cache().addTicket(this);
            }
            return Promise.resolve(this);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    updateFlightScehdule() {
        const tickets = cache().tickets()
        const ids = tickets
            // .filter(t => t.flightNumber === this.flightNumber)
            // .filter(t => t.flightDate !== this.flightDate)
            // .filter(t => t.ticketId !== this.ticketId)
            // .map(t => t.ticketId)
            .reduce((arr, obj) => {
                if (
                    obj["flightNumber"] === this.flightNumber &&
                    obj["flightDate"] !== this.flightDate &&
                    obj["ticketId"] !== this.ticketId
                ) {
                    arr.push(obj);
                }
                return arr;
            }, [])
            .map((ticket) => ticket.ticketId);

        if (ids.length > 0)
            cache().updateTicketsByID(ids, "flightDate", this.flightDate);
    };

    async isValidTicketDate() {
        return new Promise((resolve, reject) => {
            if ($().isValidDate(this.flightDate)) {
                resolve(this.flightDate);
            } else {
                const error = new Error();
                error.message = {
                    status: "failed",
                    reason: "invalid flight date",
                };
                error.status = 400;
                error.stack = null;
                reject(error);
            }
        });
    }

    async isValidTicketID() {
        return new Promise((resolve, reject) => {
            const tickets = cache().tickets();
            if (tickets.map((a) => a.ticketId).indexOf(this.ticketId) === -1) {
                resolve(true);
            } else {
                const error = new Error();
                error.message = {
                    status: "failed",
                    reason: "ticketId already exists",
                };
                error.status = 400;
                error.stack = null;
                reject(error);
            }
        });
    }

    async isValidSeatNum() {
        return new Promise((resolve, reject) => {
            const occupiedSeats = cache()
                .tickets()
                .filter((f) => f.flightNumber === this.flightNumber)
                .filter((f) => f.flightDate === this.flightDate)
                .map((f) => f.seatNumber);

            if (occupiedSeats.indexOf(this.seatNumber) === -1) {
                resolve(true);
            } else {
                const error = new Error();
                error.message = {
                    status: "failed",
                    reason: "seatNumber already taken",
                };
                error.status = 400;
                error.stack = null;
                reject(error);
            }
        });
    }
}

export default TicketBuilder;
