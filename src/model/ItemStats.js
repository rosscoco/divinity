module.exports = function (sequelize, Datatypes) {
	const ItemStats = sequelize.define('ItemStats', {
		id: {
			type: Datatypes.STRING,
			primaryKey: true
		},
		displayName: Datatypes.STRING,
		description: Datatypes.TEXT,
		icon: Datatypes.STRING,
		value: Datatypes.INTEGER,
		weight: Datatypes.INTEGER,
		rootTemplate: Datatypes.STRING,
		modifierType: Datatypes.STRING,
		comboCategory: Datatypes.STRING,
		requirements: Datatypes.STRING,
		strength: Datatypes.INTEGER,
		finesse: Datatypes.INTEGER,
		intelligence: Datatypes.INTEGER,
		constitution: Datatypes.INTEGER,
		memory: Datatypes.INTEGER,
		wits: Datatypes.INTEGER,
		vitality: Datatypes.INTEGER,
		armor: Datatypes.INTEGER,
		piercingResistance: Datatypes.INTEGER,
		physicalResistance: Datatypes.INTEGER,
		fireResistance: Datatypes.INTEGER,
		earthResistance: Datatypes.INTEGER,
		waterResistance: Datatypes.INTEGER,
		airResistance: Datatypes.INTEGER,
		poisonResistance: Datatypes.INTEGER,
		flags: Datatypes.STRING,
		objectCategory: Datatypes.STRING,
	}, {
		freezeTableName: true
	});

	ItemStats.associate = (models) => {
		models.ItemStats.hasMany(models.RecipeResult, { unique: false });
		// models.ItemStats.hasMany(models.Ingredient);
	};

	return ItemStats;
};
