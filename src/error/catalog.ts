export enum ErrorTypes {
  IdLenth = 'IdLenth',
  NotFound = 'NotFound',
}

type ErrorResponse = {
  message: string;
  status: number;
};

type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponse;
};

const errorCatalog: ErrorCatalog = {
  IdLenth: {
    message: 'Id must have 24 hexadecimal characters',
    status: 400,
  },
  NotFound: {
    message: 'Object not found',
    status: 404,
  },
};

export default errorCatalog;
