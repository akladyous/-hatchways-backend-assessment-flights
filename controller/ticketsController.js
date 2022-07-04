import TicketBuilder from "../models/TicketBuilder.js"
import { cache } from '../service/cache.js'

class TicketsController {
    constructor(options) {
        this.options = options
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
    }

    get(req, res, next) {
        const tickets = cache().tickets()
        res.status(200).json({ tickets: tickets })
    }
    async post(req, res, next) {
        try {
            await this.validate(req.body)
            const { ticketId, flightDate, flightNumber, seatNumber, ticketCost } = req.body.event
            const ticket = new TicketBuilder()
            ticket
                .setTicketId(ticketId)
                .setFlightDate(flightDate)
                .setFlightNumber(flightNumber)
                .setSeatNumber(seatNumber)
                .setTicketCost(ticketCost)
                .build()
            await ticket.validateTicket();
            ticket.updateFlightScehdule();

            res.status(200).json({ status: "success" })
        } catch (error) {
            console.error('error : ', error)
            next(error)
        }
    };

    async validate(body) {
        try {
            await this.isValidEvent(body)
            const results = await Promise.all([
                this.isValidDate(body),
                this.isValidProps(body)
            ]);
            return Promise.resolve(results.every(Boolean));
        } catch (error) {
            return Promise.reject(error)
        }
    };

    isValidEvent(body) {
        return new Promise((resolve, reject) => {
            if (body.hasOwnProperty('event')) {
                resolve(true)
            } else {
                const error = new Error("missing 'event' property")
                error.status = 404
                error.stack = null
                reject(error)
            }
        })
    }
    isValidProps(body) {
        const allowedParams = this.options.props
        const props = Object.keys(body.event);
        let wrongProp = null;
        return new Promise((resolve, reject) => {
            if (
                props.every((prop) => {
                    if (!allowedParams.includes(prop)) {
                        wrongProp = prop;
                        return false;
                    } else {
                        return true;
                    }
                })
            ) {
                resolve(true);
            } else {
                const error = new Error(`${wrongProp} is not a valid property`)
                error.status = 404
                error.stack = null
                reject(error);
            }
        });
    }
    isValidDate(body) {
        return new Promise((resolve, reject) => {
            let flightDate = body?.event?.flightDate
            if (!isNaN(Date.parse(flightDate))) {
                resolve(true);
            } else {
                const error = new Error("invalid flight date")
                error.status = 404
                error.stack = null
                reject(error);
            }
        });
    }
    isValidSortBy(query) {
        const sortBy = this.options.sortBy;
        return new Promise((resolve, reject) => {
            if (query?.sortBy) {
                if (sortBy.includes(query.sortBy)) {
                    this.params.sortBy = query.sortBy;
                    resolve({ sortBy: query.sortBy });
                } else {
                    const error = new Error(`${query.sortBy} is invalid sortBy parameter`)
                    error.status = 404;
                    reject(error);
                }
            } else {
                resolve({ sortBy: sortBy[0] });
            }
        });
    }
    isValidDirection(query) {
        const direction = this.options.direction;
        return new Promise((resolve, reject) => {
            if (query?.direction) {
                if (direction.includes(query.direction)) {
                    this.params.direction = query.direction;
                    resolve({ direction: query.direction });
                } else {
                    reject(`${query.direction} is invalid sorting method`);
                }
            } else {
                resolve({ direction: "asc" });
            }
        });
    };

};

export default TicketsController;