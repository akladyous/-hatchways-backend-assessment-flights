import axios from '../config/axios.js'

import { ticketsSample } from '../data/ticketsSample.js'
ticketsSample.tickets.forEach(ticket => {
    axios.post('/tickets', ticket)
        // .then(response => console.log(response.data))
        .catch(error => console.log('error : ', error.response.data))
})
