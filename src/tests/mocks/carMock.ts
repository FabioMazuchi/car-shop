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

const carMockForChange: ICar = {
	model: 'Gol 2.0',
	year: 2001,
	color: 'Prata',
	buyValue: 4000,
	seatsQty: 4,
	doorsQty: 4,
};

const carMockForChangeId: ICar & { _id: string } = {
	_id: '62cf1fc6498565d94eba52cd',
	model: 'Gol 2.0',
	year: 2001,
	color: 'Prata',
	buyValue: 4000,
	seatsQty: 4,
	doorsQty: 4,
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

export { carMock, carMockId, allCarMock, carMockForChange, carMockForChangeId }