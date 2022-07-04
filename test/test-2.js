import axios from '../config/axios.js'
import { $ } from '../helpers/util.js'
import { airlinesDB } from '../data/airlinesDB.js'

const body = {
    event: {
        ticketId: 1,
        flightDate: "2022-07-10",
        flightNumber: "MS",
        seatNumber: '1A',
        ticketCost: 1
    }
}
const dateList = [];
((total) => {
    const randomDates = $().listFromDateRange('2022-06-01', '2022-06-30')
    for (let i = 0; i < total; i++) {
        dateList.push($().sample(randomDates))
    }
})(15)

const flightNumList = [];
((total) => {
    const flightNumbers = airlinesDB.map(a => a.flightNumber)
    for (let i = 0; i < total; i++) {
        flightNumList.push($().sample(flightNumbers))
    }
})(50)

const generatedData = [];

for (let t = 0; t < flightNumList.length; t++) {
    const tickets = {
        date: $().sample(dateList),
        totalTickets: $().random(1, 15),
        resolvedTickets: 0,
        rejectedTickets: 0
    }
    for (let n = 0; n < tickets.totalTickets; n++) {
        body.event.ticketId = $().random(100, 5000);
        body.event.flightDate = tickets.date;
        body.event.flightNumber = flightNumList.at(t)
        body.event.seatNumber = `${n}A` // $().sample(airlinesDB[x].availableSeats)
        try {
            await axios.post('/tickets', body)
            tickets.resolvedTickets += 1;
        } catch (error) {
            tickets.rejectedTickets += 1;
            console.log('error : ', error.response.data)
        }
    };
    generatedData.push(tickets)
};
console.log(generatedData)
