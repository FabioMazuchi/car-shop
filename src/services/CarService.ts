import { ErrorTypes } from '../error/catalog';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  async update(_id: string, obj: ICar): Promise<ICar | null> {
    await this.readOne(_id);

    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    await this._car.update(_id, obj);
    const updatedCar = { ...obj, _id };
    return updatedCar;
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
