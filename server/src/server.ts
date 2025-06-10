const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for front-end client
app.use(cors({
origin: process.env.CLIENT_URL || '*',
credentials: true
}));

// Serve the React app's static files
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
app.listen(PORT, () => {
console.log(Server is listening on port ${PORT});
});
});