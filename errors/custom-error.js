


class CustomError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}


const myCustomError = (message, status) => {
	return new CustomError(message, status);
}

module.exports =  { myCustomError, CustomError };