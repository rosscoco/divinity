module.exports = function (sequelize, Datatypes) {
	const ItemStats = sequelize.define('ItemStats', {
		id: {
			type: Datatypes.STRING,
			primaryKey: true
		},
		name: Datatypes.STRING,
		displayName: Datatypes.STRING,
		parent: Datatypes.STRING,
		rootTemplate: Datatypes.STRING,
		value: Datatypes.INTEGER,
		weight: Datatypes.INTEGER,
		comboCategory: Datatypes.STRING,
		isConsumable: Datatypes.STRING,
		itemGroup: Datatypes.STRING,
		previewIcon: Datatypes.STRING,
		previewTooltip: Datatypes.STRING,
		objectCategory: Datatypes.STRING,
		// modifierType: Datatypes.STRING,
		// requirements: Datatypes.STRING,
		// strength: Datatypes.INTEGER,
		// finesse: Datatypes.INTEGER,
		// intelligence: Datatypes.INTEGER,
		// constitution: Datatypes.INTEGER,
		// memory: Datatypes.INTEGER,
		// wits: Datatypes.INTEGER,
		// vitality: Datatypes.INTEGER,
		// armor: Datatypes.INTEGER,
		// piercingResistance: Datatypes.INTEGER,
		// physicalResistance: Datatypes.INTEGER,
		// fireResistance: Datatypes.INTEGER,
		// earthResistance: Datatypes.INTEGER,
		// waterResistance: Datatypes.INTEGER,
		// airResistance: Datatypes.INTEGER,
		// poisonResistance: Datatypes.INTEGER,
		// flags: Datatypes.STRING,
		// ranged: Datatypes.INTEGER,
		// dualWielding: Datatypes.INTEGER,
		// physicalArmorMastery: Datatypes.INTEGER,
		// necromancy: Datatypes.INTEGER,
		// polymorph: Datatypes.INTEGER,
		// summoning: Datatypes.INTEGER,
		// sneaking: Datatypes.INTEGER,
		// thievery: Datatypes.INTEGER,
		// loremaster: Datatypes.INTEGER,
		// persuasion: Datatypes.INTEGER,
		// leadership: Datatypes.INTEGER,
		// luck: Datatypes.INTEGER,
		// sight: Datatypes.INTEGER,
		// initiative: Datatypes.INTEGER,
		// movement: Datatypes.INTEGER,
		// movementSpeedBoost: Datatypes.INTEGER,
		// vitalityBoost: Datatypes.INTEGER,
		// vitalityPercentage: Datatypes.INTEGER,
		// chanceToHitBoost: Datatypes.INTEGER,
		// accuracyBoost: Datatypes.INTEGER,
		// dodgeBoost: Datatypes.INTEGER,
		// damageBoost: Datatypes.INTEGER,
		// armorBoost: Datatypes.INTEGER,
		// magicArmor: Datatypes.INTEGER,
		// magicArmorBoost: Datatypes.INTEGER,
		// reflection: Datatypes.INTEGER,
		// lifeSteal: Datatypes.INTEGER,
		// damage: Datatypes.INTEGER,
		// damageType: Datatypes.STRING,
		// statusEffect: Datatypes.STRING,
		// statusIcon: Datatypes.STRING,
		// statusMaterial: Datatypes.STRING,
		// isFood: Datatypes.STRING,
		// armorDefenseValue: Datatypes.INTEGER,
		// magicArmorValue: Datatypes.INTEGER,
		// tags: Datatypes.STRING,
		// extraProperties: Datatypes.STRING,
		// boosts: Datatypes.STRING,
	}, { 
		freezeTableName: true,
	}); 
 
	ItemStats.associate = (models) => {
		models.ItemStats.belongsToMany(models.RecipeResult, { through: 'Recipe', as: 'Result' });
		// models.ItemStats.hasMany(models.Ingredient);
	};

	return ItemStats;
};
