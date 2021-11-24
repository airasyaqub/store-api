
const Product = require('../models/products');


const getAllProducts = async (req, res) => {


	const { name, featured, company, sort, fields } = req.query;

	const queryObj = {};
	let sortList = 'createdAt';
	

	if (name) {
		queryObj.name = { $regex: name, $options: 'i' };
	}

	if (featured) {
		queryObj.featured = featured === 'true' ? true : false;
	}

	if (company) {
		queryObj.company = company;
	}

	if (sort) {
		sortList = sort.split(','). join(' ');
	}

	let result = Product.find(queryObj).sort(sortList);

	if (fields) {
		const fieldsList = fields.split(','). join(' ');
		result = Product.find(queryObj).sort(sortList).select(fieldsList);
	}

	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skip = (page -1 ) * limit;


	result = await result.skip(skip).limit(limit);

	res.status(200).json({ data: result, length: result.length });
}

module.exports = {
	getAllProducts
}