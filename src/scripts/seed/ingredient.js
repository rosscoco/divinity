// const { Op } = require('sequelize');

let db;
let RECIPES;


function dbCreateIngredients() {
	const ingredients = {};

	RECIPES.forEach((recipeJSON) => {
		if (recipeJSON.ingredients.length === 0) return;
		for (let i = 0; i < recipeJSON.ingredients.length; i++) {
			ingredients[recipeJSON.ingredients[i]] = {
				name: recipeJSON.ingredients[i],
				type: recipeJSON.ingredientTypes[i]
			};
		}
	});

	return db.Ingredient.bulkCreate(Object.values(ingredients));
}

// function dbCreateIngredients() {
// 	db.ItemStats.findAll({
// 		attributes: ['id', 'name']
// 	}).then((results) => {
// 		console.log(results);
// 	});
// }

// function setIngredients(recipeResults, ingredientStats) {
// 	const setList = [];

// 	recipeResults.forEach((result) => {
// 		for (let i = 0; i < ingredientStats.length; i++) {
// 			if (ingredientStats[i].name === ingredient.name) {
// 				foundIngredient = ingredientStats[i];
// 				break;
// 			}
// 		}

// 		if (foundIngredient === undefined) throw new Error(`Could not find details for ${recipe.dataValues.ingredients}.`);

// 		setList.push(recipe.addIngredient(foundIngredient.id));
// 	});

// 	return Promise.all(setList);
// }

module.exports = function (sequelize, dataFile) {
	db = sequelize;
	RECIPES = dataFile;
	console.log('Creating Ingredients');

	// let updatePromises = [];

	// db.ItemStats.findAll({
	// 	raw: true,
	// 	attributes: ['id', 'displayName']
	// }).then((itemResults) => {
	// 	db.RecipeResult.findAll()
	// 		.then((recipeResults) => {
	// 			updatePromises = recipeResults.map(recipe => setIngredients(recipe, itemResults));
	// 		});
	// });

	//	return Promise.all(updatePromises);

	return new Promise((res, rej) => {
		dbCreateIngredients()
			.then(() => {
				res();
			})
			.catch((err) => {
				debugger;
				rej(err);
			});
	});
};
