import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { carMock, carMockId } from '../../mocks/carMock';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
  });

  after(()=>{
    sinon.restore();
  })

  describe("Create Car", () => {
    it("success", async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockId);
		});

		it("failure", async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
  });

});