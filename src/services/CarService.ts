import { ErrorTypes } from '../error/catalog';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  async delete(_id: string): Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.IdLenth);
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.NotFound);
    
    return this._car.delete(_id);
  }

  async update(_id: string, obj: ICar): Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.IdLenth);
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.NotFound);

    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._car.update(_id, obj);
  }

  async readOne(_id: string): Promise<ICar> {
    if (_id.length < 24) throw new Error(ErrorTypes.IdLenth);
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.NotFound);
    return car;
  }

  async read(): Promise<ICar[]> {
    return this._car.read();
  }

  async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    
    return this._car.create(obj);
  }
}

export default CarService;
