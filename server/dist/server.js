const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
// Enable CORS for all routes
app.use(cors(corsOptions));
// Handle CORS preflight requests for all routes
app.options('*', cors(corsOptions));
// Serve the React app’s static files
app.use(express.static('../client/dist'));
// Parse JSON bodies and mount routes
app.use(express.json());
app.use(routes);
// Sync DB and start server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
