/* eslint-disable no-await-in-loop */
const { Op } = require('sequelize');
const db = require('../model/db');
const RECIPES = require('../../data/output/ParsedItemCombos.json');
// const ITEMDETAILS = require('../../data/output/ItemGUID.json');


async function getIngredientsForRecipe(ingredArr, options) {
	return new Promise((resolve, reject) => {
		db.Ingredient.findAll({
			where: {
				name: {
					[Op.or]: ingredArr	// Sequelize OR clause
				}
			}
		}, options).then((foundIng) => {
			if (foundIng.length === 0) reject(new Error('No Ingredients found for recipe'));
			resolve(foundIng);
		});
	});
}


function parseRecipes() {
	db.sequelize.transaction((t) => {
		const promiseList = [];
		let recipeName;
		RECIPES.forEach((recipeJson) => {
			recipeName = { name: recipeJson.results[0] };

			const dbCreateRecipe = getIngredientsForRecipe(recipeJson.ingredients, { transaction: t })
				.then(ingredArr => new Promise((resolve, reject) => {
					const ingredients = ingredArr;
					db.RecipeResult.create(recipeName, { transaction: t })
						.then(recipe => resolve(recipe, ingredients))
						.error(err => reject(err));
				}))
				.then((createdRecipe, ingredients) => {
					ingredients.forEach((data) => {
						createdRecipe.setIngredients(data.id, { transaction: t });
					});
				});
			promiseList.push(dbCreateRecipe);
		});


		return Promise.all(promiseList)
			.then(() => {
				console.log('Success???');
			});
	});
}

db.sequelize.sync({
	 force: true
}).then(() => {
	console.log('models created');
	parseIngredients();
	parseRecipes();
});
