module.exports = function (sequelize, Datatypes) {
	const RecipeResult = sequelize.define('RecipeResult', {
		name: Datatypes.STRING,
	});

	RecipeResult.associate = (models) => {
		models.RecipeResult.belongsToMany(models.Ingredient, { through: 'Recipe' });// , foreignKey: 'result_id'
	};

	return RecipeResult;
};
