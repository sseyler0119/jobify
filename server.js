import 'express-async-errors'; // handles any asynchronous errors and passes them to error middleware
import * as dotenv from 'dotenv';
dotenv.config(); // sometimes this causes problems if not at top

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';
// routers
import jobRouter from'./routes/jobRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';


// middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Data received', data: req.body });
});

app.use('/api/v1/jobs', jobRouter); 

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
