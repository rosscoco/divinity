const { Op } = require('sequelize');

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

// function dbJoinIngredientsToRecipe(data, options) {
// 	const promises = [];
// 	data.ingredients.forEach((ingredient) => {
// 		const p = data.recipe.addIngredient(ingredient.id, options)
// 			.catch((err) => {
// 				console.log(`Error setting recipe ingredient ${err}`);
// 			});
// 		promises.push(p);
// 	});
// 	return Promise.all(promises);
// }


// function getIngredientsForRecipe(ingredArr, dbRecipe, options) {
// 	const recipe = dbRecipe;
// 	return new Promise((resolve, reject) => {
// 		db.Ingredient.findAll({
// 			where: {
// 				name: {
// 					[Op.or]: ingredArr	// Sequelize OR clause
// 				}
// 			}
// 		}, options).then((ingredients) => {
// 			if (ingredients.length === 0) reject(new Error('No Ingredients found for recipe'));
// 			resolve({ ingredients, recipe });
// 		});
// 	})
// 		.catch((err) => {
// 			debugger;
// 			console.log(err);
// 		});
// }

function assignIngredients(toRecipe, data, options) {
	const setList = [];
	const recipeJson = data;

	recipeJson.ingredients.forEach((ing) => {
		setList.push(toRecipe.addIngredient(ing, options));
		// setList.push(db.ItemStats.findById(ing)
		// 	.then((dbIng) => {
		// 		console.log('!');
		// 		dbIng.setResult(toRecipe.id);
		// 	}));
	});

	return Promise.all(setList);
}

function dbCreateRecipe(data, options) {
	const recipeJson = data;

	return db.RecipeResult.create({
		name: recipeJson.name, id: recipeJson.id, itemData: recipeJson.stats, ItemStatId: `${recipeJson.stats}`
	}, options)
		// .then(dbRecipe => dbRecipe.setItemStats(recipeJson.stats, { options }))
		// .then(dbRecipe => getIngredientsForRecipe(recipeJson.ingredients, dbRecipe, options))
		// .then(ingredients => dbJoinIngredientsToRecipe(ingredients, options))
		.then((dbRecipe) => {
			console.log('!!');
			return assignIngredients(dbRecipe, recipeJson, options);
		})
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
