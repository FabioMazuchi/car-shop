import * as sinon from 'sinon';
import chai from 'chai';
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
		sinon.stub(carModel, 'delete').resolves(carMockId);
		sinon.stub(carModel, 'readOne')
		.onCall(0).resolves(carMockId)
		.onCall(1).resolves(carMockId)
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

		it("failure _id length 24 characters", async () => {
			try {
				await carService.readOne('idLengthErro');
			} catch (error: any) {
				expect(error.message).to.be.eq('IdLenth');
			}
		});
  });

	describe("Update Car", () => {
    it("success", async () => {
			const carUpdated = await carService.update('62cf1fc6498565d94eba52cd', carMockForChange);
			expect(carUpdated).to.be.deep.equal(carMockForChangeId);
		});

		it("failure _id length 24 characters", async () => {
			try {
				await carService.update('idLengthErro', carMockForChange);
			} catch (error: any) {
				expect(error.message).to.be.eq('IdLenth');
			}
		});
  });

	describe("Delete Car", () => {
    it("success", async () => {
			const carDeleted = await carService.delete('62cf1fc6498565d94eba52cd');
			expect(carDeleted).to.be.deep.equal(carMockId);
		});

		it("failure _id length 24 characters", async () => {
			try {
				await carService.delete('idLengthErro');
			} catch (error: any) {
				expect(error.message).to.be.eq('IdLenth');
			}
		});
  });
});