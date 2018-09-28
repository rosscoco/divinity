module.exports = function (sequelize, Datatypes) {
	const RecipeResult = sequelize.define('RecipeResult', {
		id: {
			primaryKey: true,
			type: Datatypes.INTEGER
		},
		name: {
			type: Datatypes.STRING,
		}
	});

	RecipeResult.associate = (models) => {
		models.RecipeResult.belongsToMany(models.ItemStats, { through: 'RecipeStats', as: 'Stats' });
		models.RecipeResult.belongsToMany(models.ItemStats, { through: 'Recipe', as: 'Ingredient' });
	};

	return RecipeResult;
};
