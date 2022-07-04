import express from 'express';
export const ticketsRoute = express.Router();
import TicketsController from '../../controller/ticketsController.js';

const options = {
    props: ["ticketId", "flightDate", "flightNumber", "seatNumber", "ticketCost"],
    sortBy: ["ticketId", "flightNumber", "ticketCost"],
    direction: ['asc', 'desc'],
}
const tickets = new TicketsController(options)

ticketsRoute.get('/tickets', tickets.get)
ticketsRoute.post('/tickets', tickets.post)
