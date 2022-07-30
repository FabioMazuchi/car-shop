import { model as mongooseCreatemodel, Schema } from 'mongoose';
import IFrame from '../interfaces/Frame';
import MongoModel from './MongoModel';

const frameMongooseSchema = new Schema<IFrame>({
  material: String,
  color: String,
});

class Frame extends MongoModel<IFrame> {
  constructor(model = mongooseCreatemodel('Frame', frameMongooseSchema)) {
    super(model);
  }
}

export default Frame;
