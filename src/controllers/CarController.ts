import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  constructor(private _service: IService<ICar>) {}

  async update(req: Request, res: Response<ICar | null>) {
    const carUpdated = await this._service.update(req.params.id, req.body);
  
    return res.status(200).json(carUpdated);
  }

  async readOne(req: Request, res: Response<ICar>) {
    const car = await this._service.readOne(req.params.id);
  
    return res.status(200).json(car);
  }

  async read(req: Request, res: Response<ICar[]>) {
    const result = await this._service.read();
  
    return res.status(200).json(result);
  }

  async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };
    const result = await this._service.create(car);

    return res.status(201).json(result);
  }
}

export default CarController;