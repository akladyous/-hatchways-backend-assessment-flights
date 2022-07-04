import { cache } from "../service/cache.js";

class Dates {
    #dateList
    constructor(dateList) {
        this.dates = []
        this.#dateList = dateList
    };
    generateDates() {
        this.#dateList.forEach(date => {
            this.dates.push({
                date: date,
                flights: []
            })
        });
        return this;
    };
    generateFlights() {
        this.dates.forEach(obj => {
            const ticketsByDate = cache().tickets().filter(t => t.flightDate === obj.date)
            if (ticketsByDate.length === 0) return

            obj.flights.push(this.generateReport(ticketsByDate))
        })
    };
    generateReport(ticketsList) {
        const result = [];
        ticketsList.reduce((acc, obj) => {
            if (!acc[obj.flightNumber]) {
                acc[obj.flightNumber] = {
                    flightNumber: obj.flightNumber,
                    revenue: 0,
                    occupiedSeats: [],
                }
                result.push(acc[obj.flightNumber])
            };
            acc[obj.flightNumber].revenue += obj.ticketCost
            acc[obj.flightNumber].occupiedSeats.push(obj.seatNumber)
            return acc;
        }, {})
        return result;
    }
    toString() {
        return JSON.stringify(this);
    };
};
export default Dates;