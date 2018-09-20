/* eslint-disable no-await-in-loop */


const db = require('../../model/db');
const RECIPES = require('../../../data/output/ItemCombos.json');
const ITEMSTATS = require('../../../data/output/ItemStats.json');
const ITEMTEXT = require('../../../data/output/ItemGUID.json');
const createItemStats = require('./stats');
const createRecipes = require('./recipe');
const createIngredients = require('./ingredient');
// const ITEMDETAILS = require('../../data/output/ItemGUID.json');


db.sequelize.sync({
	force: true
}).then(() => {
	console.log('models created');
	// createItemStats(db, ITEMSTATS, ITEMTEXT);

	createItemStats(db, ITEMSTATS, ITEMTEXT)
		.then(() => createIngredients(db, RECIPES))
		.then(() => createRecipes(db, RECIPES))
		.catch((err) => {
			debugger;
			console.log(err);
		});
});
