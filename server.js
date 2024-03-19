import 'express-async-errors'; // handles any asynchronous errors and passes them to error middleware
import * as dotenv from 'dotenv';
dotenv.config(); // sometimes this causes problems if not at top

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';


// routers
import jobRouter from'./routes/jobRouter.js';
import authRouter from'./routes/authRouter.js';
import userRouter from'./routes/userRouter.js';

// public
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';


// middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/dist')))

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api/v1/test', (req, res) => {
  res.json({msg: "test route"})
})


app.use('/api/v1/jobs', authenticateUser, jobRouter); 
app.use('/api/v1/auth', authRouter); 
app.use('/api/v1/users',authenticateUser, userRouter); 

/* our post build front-end route must be placed after all of the previous routes but before the error route
  is b/c the front end still needs to use our back end. The above code will still be 
  used for all of the get routes */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
})

// not found
app.use('*', (req, res) => {
    res.status(404).json({msg: 'not found'});
})
 // error middleware, this must come last
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 5000;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {  
      console.log(`server listening on PORT ${port}...`);
    });
} catch (error) {
    console.log(error);
    process.exit(1)
}
