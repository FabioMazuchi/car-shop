import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
	model: 'Gol',
	year: 1999,
	color: 'Prata',
	buyValue: 3000,
	seatsQty: 2,
	doorsQty: 2,
};

const carMockId: ICar & { _id: string } = {
	_id: '62cf1fc6498565d94eba52cd',
	model: 'Gol',
	year: 1999,
	color: 'Prata',
	buyValue: 3000,
	seatsQty: 2,
	doorsQty: 2,
};

const allCarMock: ICar[] & { _id: string }[] = [
	{
		_id: '62cf1fc6498565d94eba52cd',
		model: 'Gol',
		year: 1999,
		color: 'Prata',
		buyValue: 3000,
		seatsQty: 2,
		doorsQty: 2,
	},	
]

export { carMock, carMockId, allCarMock }