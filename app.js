const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: ('./.env') });
const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

// Database Configuration
const conn = require('./config/db');

const routes = require('./routes/auth');
app.use('/',routes)

app.listen(port, async () => {
    await conn.dbConnect();
    console.log(`Server is Running at ${port}`);
})


