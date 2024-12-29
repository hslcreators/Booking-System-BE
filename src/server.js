import app from './app.js'
import http from 'http'
const server = http.createServer(app)
import { config } from './config/config.js'
const PORT  = config.PORT
const mongoUrl = config.MONGO_URL
import mongoose from 'mongoose'
const maxRetries = 5;
let retries = 0;


const connectWithRetry = () => {
    console.log(`MongoDB connection attempt ${retries + 1}`);

    mongoose.connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to database');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        retries += 1;
        console.log(`Error connecting to database: ${err.message}`);
        if (retries < maxRetries) {
            console.log(`Retrying to connect to database (${retries}/${maxRetries})...`);
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log('Max retries reached. Could not connect to database.');
        }
    });
};

connectWithRetry();


