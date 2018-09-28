const { Op } = require('sequelize');
const logger = require('../../log/logger.js');

let db;
let RECIPES;

function forceRecipeIds(jsonArr) {
	let inc = 0;
	const newJson = jsonArr.map((json) => {
		const dataWithId = { id: ++inc };
		Object.assign(dataWithId, json);
		return dataWithId;
	});

	return newJson;
}

function assignStats(toRecipe, data, options) {
	return toRecipe.addStats(data.name, options);
}

function assignIngredients(toRecipe, data, options) {
	const setList = [];
	const recipeJson = data;


	recipeJson.ingredients.forEach((ing) => {
		setList.push(toRecipe.addIngredient(ing, options));
	});

	return Promise.all(setList)
		.then(() => ({ toRecipe, recipeJson }));
}

function dbCreateRecipe(data, options) {
	const recipeJson = data;

	logger.info(recipeJson.name);
	return db.RecipeResult.create({
		name: recipeJson.name, id: recipeJson.id, itemData: recipeJson.stats, ItemStatId: `${recipeJson.stats}`
	}, options)
		.then(dbRecipe => assignIngredients(dbRecipe, recipeJson, options))
		.then(result => assignStats(result.toRecipe, result.recipeJson, options))
		// .then(dbRecipe => dbRecipe.setIngredients(recipeJson.ingredients, options))
		.catch((err) => {
			debugger;
			console.log(err);
		});
}

function createRecipes(onNext, onError) {
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
				onError(err);
			})
			.then(() => onNext());
	});
}


module.exports = function (sequelize, dataFile) {
	db = sequelize;
	RECIPES = dataFile;

	return new Promise((res, rej) => {
		createRecipes(res, rej);
	});
};
