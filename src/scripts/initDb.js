/* eslint-disable no-await-in-loop */

const { Op } = require('sequelize');
const db = require('../model/db');
const RECIPES = require('../../data/output/ParsedItemCombos.json');
// const ITEMDETAILS = require('../../data/output/ItemGUID.json');


function forceRecipeIds(jsonArr) {
	let inc = 0;
	const newJson = jsonArr.map((json) => {
		const dataWithId = { id: ++inc };
		Object.assign(dataWithId, json);
		return dataWithId;
	});

	return newJson;
}

async function getIngredientsForRecipe(ingredArr, dbRecipe, options) {
	const recipe = dbRecipe;
	return new Promise((resolve, reject) => {
		db.Ingredient.findAll({
			where: {
				name: {
					[Op.or]: ingredArr	// Sequelize OR clause
				}
			}
		}, options).then((ingredients) => {
			if (ingredients.length === 0) reject(new Error('No Ingredients found for recipe'));
			resolve({ ingredients, recipe });
		});
	})
		.catch((err) => {
			debugger;
			console.log(err);
		});
}

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

function dbJoinIngredientsToRecipe(data, options) {
	const promises = [];
	data.ingredients.forEach((ingredient) => {
		const p = data.recipe.addIngredient(ingredient.id, options)
			.catch((err) => {
				console.log(`Error setting recipe ingredient ${err}`);
			});
		promises.push(p);
	});
	return Promise.all(promises);
}


function dbCreateRecipe(data, options) {
	const recipeJson = data;
	return db.RecipeResult.create({ name: recipeJson.name, id: recipeJson.id }, options)
		.then(dbRecipe => getIngredientsForRecipe(recipeJson.ingredients, dbRecipe, options))
		.then(ingredients => dbJoinIngredientsToRecipe(ingredients, options))
		.catch((err) => {
			debugger;
			console.log(err);
		});
}

function createRecipes() {
	const recipesWithId = forceRecipeIds(RECIPES);
	const promiseList = [];
	db.sequelize.transaction((transaction) => {
		const options = { transaction };

		recipesWithId.forEach((recipeJSON) => {
			promiseList.push(dbCreateRecipe(recipeJSON, options)
				.catch((err) => {
					debugger;
					console.log(err);
				}));
		});

		return Promise.all(promiseList)
			.catch((err) => {
				debugger;
				console.log(err);
			});
	});
}


db.sequelize.sync({
	force: true
}).then(() => {
	console.log('models created');
	dbCreateIngredients()
		.then(() => createRecipes())
		.catch((err) => {
			debugger;
			console.log(err);
		});
});
