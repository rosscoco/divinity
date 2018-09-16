/* eslint-disable no-await-in-loop */
const db = require('../model/db');
const Op = require('sequelize').Op;
const _RECIPES = require('../../data/output/ParsedItemCombos.json');
const _ITEMDETAILS = require('../../data/output/ItemGUID.json');


db.sequelize.sync({
	 force: true
}).then(() => {
	console.log('models created');
	  parseIngredients();
	  parseRecipes();

	//  db.Ingredient.findAll()
	//  .then((result) => {
	// 	 console.log(result);
	//  })
	//  .error((e) => {
	// 	 console.log('uh oh');
	//  });
});

async function getIngredientsForRecipe(ingredArr) {
	return new Promise((resolve, reject) => {
		db.Ingredient.findAll({
			where: {
				name: {
					[Op.or]: ingredArr	// Sequelize OR clause
				}
			}
		}).then((foundIng) => {
			if (foundIng.length === 0) reject(new Error('No Ingredients found for recipe'));
			resolve(foundIng);
		});
	});
}


function parseIngredients() {
	const ingredients = {};

	_RECIPES.forEach((recipeJSON) => {
		if (recipeJSON.ingredients.length === 0) return;
		for (let i = 0; i < recipeJSON.ingredients.length; i++) {
			ingredients[recipeJSON.ingredients[i]] = {
				name: recipeJSON.ingredients[i],
				type: recipeJSON.ingredientTypes[i]
			};
		}
	});

	db.Ingredient.bulkCreate(Object.values(ingredients))
		.then(() => {
			console.log('Created Ingredients');
		});
}


async function parseRecipes() {
	for (let i = 0; i < _RECIPES.length; i++) {
		const recipeName = { name: _RECIPES[i].results[0] };
		const createdRecipe = await db.RecipeResult.create(recipeName);
		// const ingredients = await getIngredientsForRecipe(_RECIPES[i].ingredients);

		// ingredients.forEach((data) => {
		// 	createdRecipe.setIngredients(data.id);
		// });
	}
}
