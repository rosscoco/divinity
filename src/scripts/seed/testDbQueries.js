const db = require('../../model/db');


db.sequelize.sync({
	// force: true
}).then(() => {
	db.RecipeResult.findAll(1, {
		attributes: ['id', 'name'],
		include: [{
			model: db.ItemStats,
			as: 'Ingredient',
			attributes: ['displayName']
		}, {
			model: db.ItemStats,
			as: 'Stats',
			attributes: ['displayName'],
			exclude: ['RecipeStats']

		}]
	})
		.then((results) => {
			console.log(JSON.stringify(results, null, 4));
		});
});
