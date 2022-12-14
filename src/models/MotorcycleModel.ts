import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>(
  {
    model: String,
    category: String,
    year: Number,
    color: String,
    buyValue: Number,
    engineCapacity: Number,
  },
  { versionKey: false },
);

class Motorcycle extends MongoModel<IMotorcycle> {
  constructor(
    model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema),
  ) {
    super(model);
  }
}

export default Motorcycle;
