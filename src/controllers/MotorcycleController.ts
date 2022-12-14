import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  async delete(req: Request, res: Response<IMotorcycle | null>) {
    await this._service.delete(req.params.id);

    return res.status(204).json();
  }

  async update(req: Request, res: Response<IMotorcycle | null>) {
    const carUpdated = await this._service.update(req.params.id, req.body);

    return res.status(200).json(carUpdated);
  }

  async readOne(req: Request, res: Response<IMotorcycle>) {
    const car = await this._service.readOne(req.params.id);

    return res.status(200).json(car);
  }

  async read(req: Request, res: Response<IMotorcycle[]>) {
    const result = await this._service.read();

    return res.status(200).json(result);
  }

  async create(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ) {
    const result = await this._service.create(req.body);

    return res.status(201).json(result);
  }
}

export default MotorcycleController;
