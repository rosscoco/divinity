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

module.exports = function (sequelize, dataFile) {
	db = sequelize;
	RECIPES = dataFile;

	return new Promise((res, rej) => {
		dbCreateIngredients()
			.then(() => {
				res();
			})
			.catch((err) => {
				rej(err);
			});
	});
};
