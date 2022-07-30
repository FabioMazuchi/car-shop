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
});
