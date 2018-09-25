const db = require('../../model/db');


db.sequelize.sync({
	// force: true
}).then(() => {
	db.RecipeResult.findById(1, {
		include: [{
			model: db.ItemStats
		}]
	}).then((results) => {
		console.log(results);
	});
});
