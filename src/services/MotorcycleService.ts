import { ErrorTypes } from '../error/catalog';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  async delete(_id: string): Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.IdLenth);
    const motorcycle = await this._motorcycle.readOne(_id);

    if (!motorcycle) throw new Error(ErrorTypes.NotFound);
    
    return this._motorcycle.delete(_id);
  }

  async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.IdLenth);
    const motorcycle = await this._motorcycle.readOne(_id);

    if (!motorcycle) throw new Error(ErrorTypes.NotFound);

    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._motorcycle.update(_id, obj);
  }

  async readOne(_id: string): Promise<IMotorcycle> {
    if (_id.length < 24) throw new Error(ErrorTypes.IdLenth);
    const motorcycle = await this._motorcycle.readOne(_id);

    if (!motorcycle) throw new Error(ErrorTypes.NotFound);
    return motorcycle;
  }

  async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    
    return this._motorcycle.create(obj);
  }
}

export default MotorcycleService;
