import express from 'express';
import 'express-async-errors';
import carRouter from './routes/CarRoute';
import motorcycleRouter from './routes/MotorcycleRoute';
import errorHandler from './middlewares/error';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(errorHandler);

export default app;
