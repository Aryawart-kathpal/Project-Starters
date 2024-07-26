require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

//db
const connectDB = require('./db/connect');

//middlewares
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimiter = require('express-rate-limit');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,  
});

//routes


// using middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(morgan('tiny'));
app.use(fileUpload({ useTempFiles: true }));


app.get('/',async(req,res)=>{
    res.send('Project starter');
})

//using all other routes


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to the database");
        server.listen(port,()=>console.log(`Server is listening on port ${port}...`)); // Use `server.listen`
    } catch (error) {
        console.log(error);
    }
}

start();
