import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async delete(_id: string): Promise<T | null> {
    return this._model.findByIdAndRemove({ _id });
  }

  async update(_id: string, obj: T): Promise<T | null> {
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  async readOne(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  async read(): Promise<T[]> {
    return this._model.find();
  }

  async create(obj: T): Promise<T> {
    const result = await this._model.create({ ...obj });
    
    return result;
  }
}

export default MongoModel;
