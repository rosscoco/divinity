const itemNameList = require('../../../../data/output/ItemNamesHash.json');
const recipeNameList = require('../../../../data/output/ItemComboResultNameHash.json');
const itemStats = require('../../../../data/output/ItemStats.json');
const recipes = require('../../../../data/output/ItemCombos.json');


function validateItemNames() {
	const found = [];
	const notFound = [];

	itemStats.forEach((details) => {
		const itemName = details.name;

		if (itemNameList.hasOwnProperty(itemName)) {
			found.push(details);
		} else {
			notFound.push(details.name);
		}
	});

	console.log(`Looking for item display names. Found ${found.length}/${found.length + notFound.length}`);
	console.log(notFound);
}

function checkRecipeIngredients() {
	const found = [];
	const notFound = [];
	const notFoundYet = [];

	recipes.forEach((details) => {
		details.ingredients.forEach((ingredient) => {
			if (itemNameList.hasOwnProperty(ingredient)) {
				if (found.indexOf(ingredient) === -1) found.push(ingredient);
			} else if (notFoundYet.indexOf(ingredient) === -1) notFoundYet.push(ingredient);
		});
	});

	console.log(`Looking for recipe ingredient names. Found ${found.length}/${found.length + notFound.length}`);
	console.log(notFoundYet);
	return;

	notFoundYet.forEach((ingredient) => {
		const modifiedName = `ObjectCategories_${ingredient}_Tooltip`;
		if (recipeNameList.hasOwnProperty(modifiedName)) {
			if (found.indexOf(ingredient) === -1) found.push(ingredient);
		} else if (notFound.indexOf(ingredient) === -1) notFound.push(ingredient);
	});

	console.log(`Looking for recipe ingredient names. Found ${found.length}/${found.length + notFound.length}`);
	console.log(notFound);
}

checkRecipeIngredients();

module.exports = { validateItemNames };
