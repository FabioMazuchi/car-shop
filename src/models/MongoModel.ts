import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async readOne(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  async read(): Promise<T[]> {
    return this._model.find();
  }

  async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }
}

export default MongoModel;
