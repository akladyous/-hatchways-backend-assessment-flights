import express from 'express';
export const flightsRoute = express.Router();
import { flightsController } from '../../controller/flightsController.js'

flightsRoute.get('/flights', flightsController)
