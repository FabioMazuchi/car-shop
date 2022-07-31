import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { allCarMock, carMock, carMockForChange, carMockForChangeId, carMockId } from '../../mocks/carMock';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockId);
		sinon.stub(carModel, 'read').resolves(allCarMock);
		sinon.stub(carModel, 'update').resolves(carMockForChangeId);
		sinon.stub(carModel, 'readOne')
		.onCall(0).resolves(carMockId)
		.onCall(1).resolves(null)
		.onCall(2).resolves(carMockId)
  });

  after(()=>{
    sinon.restore();
  })

  describe("Create Car", () => {
    it("success", async () => {
			const newCar = await carService.create(carMock);
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

	describe("Read Car", () => {
    it("success", async () => {
			const cars = await carService.read();
			expect(cars).to.be.deep.equal(allCarMock);
		});
  });

	describe("ReadOne Car", () => {
    it("success", async () => {
			const car = await carService.readOne('62cf1fc6498565d94eba52cd');
			expect(car).to.be.deep.equal(carMockId);
		});

		it("failure _id lenth 24 characters", async () => {
			try {
				await carService.readOne('idLenthErro');
			} catch (error: any) {
				expect(error.message).to.be.eq('IdLenth');
			}
		});

		it("failure _id not found ", async () => {
			try {
				await carService.readOne('62cf1fc6498565d94eba52cd');
			} catch (error: any) {
				expect(error.message).to.be.eq('NotFound');
			}
		});
  });

	describe("Update Car", () => {
    it("success", async () => {
			const carUpdated = await carService.update('62cf1fc6498565d94eba52cd', carMockForChange);
			expect(carUpdated).to.be.deep.equal(carMockForChangeId);
		});
  });
});