const notFound = (req, res) => {
	res.status(404).send("no route found");
}

module.exports = notFound;