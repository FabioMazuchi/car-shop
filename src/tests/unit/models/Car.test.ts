import * as sinon from "sinon";
import chai from "chai";
import { Model } from "mongoose";
import { allCarMock, carMock, carMockId } from "../../mocks/carMock";
import CarModel from '../../../models/CarModel';
const { expect } = chai;

describe("Car Model", () => {
	const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, "create").resolves(carMockId);
    sinon.stub(Model, 'find').resolves(allCarMock);
    sinon.stub(Model, 'findOne').resolves(carMockId);
  });

  after(() => {
    sinon.restore();
  });

  describe("Create Car", () => {
    it("success", async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockId);
		});
  });

  describe("Read Car", () => {
    it("success", async () => {
			const cars = await carModel.read();
			expect(cars).to.be.deep.equal(allCarMock);
		});
  });

  describe("ReadOne Car", () => {
    it("success", async () => {
			const car = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(car).to.be.deep.equal(carMockId);
		});
  });
});
