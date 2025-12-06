import express, { Router } from 'express';
import userRouter from './routes/userRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bookingRouter from './routes/bookingRoutes.js';
import propertyRouter from './routes/propertyRoutes.js';


const app = express();
dotenv.config();
app.use(express.json());


const corsOptions = { origin: "*", credentials: true };

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use("/api/properties", propertyRouter);

app.use("/api/bookings", bookingRouter);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to the DB!`));


app.listen(3000, () => {
  console.log("The server is running on port http://localhost:3000/");
});