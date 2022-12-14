import * as sinon from "sinon";
import chai from "chai";
import CarModel from '../../../models/CarModel';
import CarService from "../../../services/CarService";
import CarController from "../../../controllers/CarController";
import { Request, Response } from "express";
import { allCarMock, carMock, carMockId } from "../../mocks/carMock";
const { expect } = chai;

describe("Car Controller", () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);
	const carController = new CarController(carService);

	const req = {} as Request;
	const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockId);
		sinon.stub(carService, 'read').resolves(allCarMock);
		sinon.stub(carService, 'readOne').resolves(carMockId);
		sinon.stub(carService, 'update').resolves(carMockId);
		sinon.stub(carService, 'delete').resolves(carMockId);

		res.status = sinon.stub().returns(res);
		res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

	describe("Create Car", () => {
    it("success", async () => {
			req.body = carMock;
			await carController.create(req, res);

			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
		});
  });

	describe("Read Car", () => {
    it("success", async () => {
			req.body = allCarMock;
			await carController.read(req, res);

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(allCarMock)).to.be.true;
		});
  });

	describe("ReadOne Car", () => {
    it("success", async () => {
			req.params = { id: carMockId._id };
			await carController.read(req, res);

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
		});
  });

	describe("Update Car", () => {
    it("success", async () => {
			req.params = { id: carMockId._id };
			req.body = carMock;
			await carController.update(req, res);

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
		});
  });

	describe("Delete Car", () => {
    it("success", async () => {
			req.params = { id: carMockId._id };
			await carController.delete(req, res);

			expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
		});
  });
});
