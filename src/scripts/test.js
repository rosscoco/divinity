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


async function parseRecipes(){
	db.sequelize.transaction((t) => {
		const promiseList = [];
		let recipeJson = {};
		let recipeName;
		for (let i = 0; i < _RECIPES.length; i++) {
			recipeJson = _RECIPES[i];
			recipeName = { name: recipeJson.results[0] };

			const p = getIngredientsForRecipe(recipeJson.ingredients)
				.then((ingredArr) => {
					return new Promise((res,rej)=>{
						const ingredients = ingredArr;
						RecipeResult.create(recipeName, { transaction: t })
							.then((recipe)=> res(recipe,ingredients));
					})
					.then((recipe,ingredients)=>{
						ingredients.forEach((data) => {
							res(createdRecipe.setIngredients(data.id, { transaction: t }));
						});
					})

				promiseList.push(p);
			})

			return Promise.all(createRecipes)
			.then((noidea) => {
				console.log('Success???');
			});
		}
	})
}