module.exports = (app) => {
	app.get('/fortnite/api/storefront/v2/catalog', function (req, res) {
		res.status(410).send();
	});
}