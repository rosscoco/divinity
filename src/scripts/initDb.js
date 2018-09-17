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

function parseIngredients() {
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

function forceRecipeIds(jsonArr) {
	let inc = 0;
	const newJson = jsonArr.map((json) => {
		const dataWithId = { id: ++inc };
		Object.assign(dataWithId, json);
		return dataWithId;
	});

	return newJson;
}

function parseRecipes() {
	const recipesWithId = forceRecipeIds(RECIPES);

	db.sequelize.transaction((t) => {
		const promiseList = [];
		let recipeName;
		RECIPES.forEach((recipeJson) => {
			recipeName = { name: recipeJson.results[0] };

			const dbGetIngredientIds = getIngredientsForRecipe(recipeJson.ingredients, { transaction: t });
			promiseList.push(dbGetIngredientIds);
			dbGetIngredientIds
				.then((ingredArr) => {
					const createRecipe = new Promise((resolve, reject) => {
						const ingredients = ingredArr;
						const name = recipeName;
						db.RecipeResult.create(name, { transaction: t })
							.then(recipe => resolve({ recipe, ingredients }))
							.error(err => reject(err));
					});
					promiseList.push(createRecipe);
				})
				.then((createRecipeResult) => {
					createRecipeResult.ingredients.forEach((data) => {
						createRecipeResult.recipe.setIngredients(data.id, { transaction: t });
					});
				})
				.catch((e) => {
					console.log(e);
				});
			// promiseList.push(dbCreateRecipe);
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
	parseIngredients().then(() => parseRecipes());
});
