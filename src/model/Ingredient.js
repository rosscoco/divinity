module.exports = function (sequelize, DataTypes) {
	const Ingredient = sequelize.define('Ingredient', {
		name: DataTypes.STRING,
		displayName: DataTypes.STRING,
		description: DataTypes.STRING,
		icon: DataTypes.STRING,
		category: DataTypes.STRING
	});

	Ingredient.associate = (models) => {
		// models.Ingredient.belongsToMany(models.RecipeResult, { through: 'Recipe' });// , foreignKey: 'ingredient_id'
	};

	return Ingredient;
};
