import express from "express";
import morgran from 'morgan'

import {
    handleErrors,
    handleMissingRoutes,
    handleCors,
} from "./middleware/middlewares.js";
import routes from "./routes/routes.js";

const app = express();
const PORT = 4000;

app.use(morgran('tiny'))
app.use(handleCors());
app.use(express.json());
routes(app)
app.use(handleMissingRoutes);
app.use(handleErrors);

app.listen(PORT, () => {
    console.log("\x1b[34m%s\x1b[0m", `ExpressJS is listening on port ${PORT}`);
});
