module.exports = function (sequelize, Datatypes) {
	const ItemStats = sequelize.define('ItemStats', {
		id: {
			type: Datatypes.STRING,
			primaryKey: true
		},
		name: Datatypes.STRING,
		parent: Datatypes.STRING,
		rootTemplate: Datatypes.STRING,
		modifier: Datatypes.STRING,
		value: Datatypes.INTEGER,
		weight: Datatypes.INTEGER,
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
		flags: Datatypes.INTEGER,
		objectCategory: Datatypes.STRING,
		ranged: Datatypes.INTEGER,
		dualWielding: Datatypes.INTEGER,
		physicalArmorMastery: Datatypes.INTEGER,
		necromancy: Datatypes.INTEGER,
		polymorph: Datatypes.INTEGER,
		summoning: Datatypes.INTEGER,
		sneaking: Datatypes.INTEGER,
		thievery: Datatypes.INTEGER,
		loremaster: Datatypes.INTEGER,
		persuasion: Datatypes.INTEGER,
		leadership: Datatypes.INTEGER,
		luck: Datatypes.INTEGER,
		sight: Datatypes.INTEGER,
		initiative: Datatypes.INTEGER,
		movement: Datatypes.INTEGER,
		movementSpeedBoost: Datatypes.INTEGER,
		vitalityBoost: Datatypes.INTEGER,
		vitalityPercentage: Datatypes.INTEGER,
		chanceToHitBoost: Datatypes.INTEGER,
		accuracyBoost: Datatypes.INTEGER,
		dodgeBoost: Datatypes.INTEGER,
		damageBoost: Datatypes.INTEGER,
		armorBoost: Datatypes.INTEGER,
		magicArmor: Datatypes.INTEGER,
		magicArmorBoost: Datatypes.INTEGER,
		reflection: Datatypes.INTEGER,
		lifeSteal: Datatypes.INTEGER,
		damage: Datatypes.INTEGER,
		statusEffect: Datatypes.STRING,
		statusIcon: Datatypes.STRING,
		statusMaterial: Datatypes.STRING,
		isConsumable: Datatypes.STRING,
		isFood: Datatypes.STRING,
	}, {
		freezeTableName: true
	});

	ItemStats.associate = (models) => {
		models.ItemStats.hasMany(models.RecipeResult, { unique: false });
		// models.ItemStats.hasMany(models.Ingredient);
	};

	return ItemStats;
};
