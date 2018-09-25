/* eslint-disable no-await-in-loop */


const db = require('../../model/db');
const RECIPES = require('../../../data/output/ItemCombos.json');
const ITEMSTATS = require('../../../data/output/ItemStatsMerged.json');
const createItemStats = require('./stats');
const createRecipes = require('./recipe');
const createIngredients = require('./ingredient');

// const ITEMDETAILS = require('../../data/output/ItemGUID.json');


db.sequelize.sync({
	force: true
}).then(() => {
	console.log('models created');

	createItemStats(db, ITEMSTATS)
		.then(() => createIngredients(db, RECIPES))
		.then(() => createRecipes(db, RECIPES))
		.then(() => {
			console.log('db seeded');
		})
		.catch((err) => {
			debugger;
			console.log(err);
		});
});
