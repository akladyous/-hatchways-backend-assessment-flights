import { rootRoute } from './home/rootRoute.js'
import { ticketsRoute } from './tickets/ticketsRoute.js';
import { flightsRoute } from './flights/flightsRoute.js';

const routes = (app) => {
    app.use('/', rootRoute)
    app.use('/api', ticketsRoute)
    app.use('/api', flightsRoute)
};

export default routes;
