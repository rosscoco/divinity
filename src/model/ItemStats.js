module.exports = function (sequelize, Datatypes) {
	const ItemStats = sequelize.define('ItemStats', {
		name: Datatypes.STRING,
		display_name: Datatypes.STRING,
		internal_name: Datatypes.STRING,
		description: Datatypes.TEXT,
		guid: Datatypes.STRING,
		value: Datatypes.INTEGER,
		weight: Datatypes.INTEGER,
		category: Datatypes.STRING
	});

	ItemStats.associate = (models) => {
		models.ItemStats.hasOne(models.RecipeResult, { foreignKey: 'item_details_id' });
		models.ItemStats.hasOne(models.Ingredient, { foreignKey: 'item_details_id' });
	};

	return ItemStats;
};
