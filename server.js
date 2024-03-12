import 'express-async-errors'; // handles any asynchronous errors and passes them to error middleware
import * as dotenv from 'dotenv';
dotenv.config(); // sometimes this causes problems if not at top

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// routers
import jobRouter from'./routes/jobRouter.js';
import authRouter from'./routes/authRouter.js';
import userRouter from'./routes/userRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

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
