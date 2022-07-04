import express from 'express';
export const rootRoute = express.Router();
import AppController from '../../controller/AppController.js';
const appController = new AppController();

rootRoute.get('/', appController.root);
rootRoute.get('/ping', appController.ping)