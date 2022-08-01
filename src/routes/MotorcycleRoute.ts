import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const route = Router();
const moto = 'motorcycles';

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post(`/${moto}`, (req, res) => motorcycleController.create(req, res));
route.get(`/${moto}`, (req, res) => motorcycleController.read(req, res));
route.get(`/${moto}/:id`, (req, res) => motorcycleController.readOne(req, res));
route.put(`/${moto}/:id`, (req, res) => motorcycleController.update(req, res));
route.delete(`/${moto}/:id`, (req, res) =>
  motorcycleController.delete(req, res));

export default route;
