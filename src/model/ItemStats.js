module.exports = function (sequelize, Datatypes) {
	const ItemStats = sequelize.define('ItemStats', {
		id: {
			type: Datatypes.STRING,
			primaryKey: true
		},
		displayName: Datatypes.STRING,
		description: Datatypes.TEXT,
		icon: Datatypes.STRING,
		value: { type: Datatypes.INTEGER, defaultValue: 0 },
		weight: { type: Datatypes.INTEGER, defaultValue: 0 },
		rootTemplate: Datatypes.STRING,
		modifierType: Datatypes.STRING,
		comboCategory: Datatypes.STRING,
		requirements: Datatypes.STRING,
		strength: { type: Datatypes.INTEGER, defaultValue: 0 },
		finesse: { type: Datatypes.INTEGER, defaultValue: 0 },
		intelligence: { type: Datatypes.INTEGER, defaultValue: 0 },
		constitution: { type: Datatypes.INTEGER, defaultValue: 0 },
		memory: { type: Datatypes.INTEGER, defaultValue: 0 },
		wits: { type: Datatypes.INTEGER, defaultValue: 0 },
		vitality: { type: Datatypes.INTEGER, defaultValue: 0 },
		armor: { type: Datatypes.INTEGER, defaultValue: 0 },
		piercingResistance: { type: Datatypes.INTEGER, defaultValue: 0 },
		physicalResistance: { type: Datatypes.INTEGER, defaultValue: 0 },
		fireResistance: { type: Datatypes.INTEGER, defaultValue: 0 },
		earthResistance: { type: Datatypes.INTEGER, defaultValue: 0 },
		waterResistance: { type: Datatypes.INTEGER, defaultValue: 0 },
		airResistance: { type: Datatypes.INTEGER, defaultValue: 0 },
		poisonResistance: { type: Datatypes.INTEGER, defaultValue: 0 },
		flags: Datatypes.STRING,
		objectCategory: Datatypes.STRING,
		ranged: { type: Datatypes.INTEGER, defaultValue: 0	},
		dualWielding: { type: Datatypes.INTEGER, defaultValue: 0 },
		physicalArmorMastery: { type: Datatypes.INTEGER, defaultValue: 0 },
		necromancy: { type: Datatypes.INTEGER, defaultValue: 0 },
		polymorph: { type: Datatypes.INTEGER, defaultValue: 0 },
		summoning: { type: Datatypes.INTEGER, defaultValue: 0 },
		sneaking: { type: Datatypes.INTEGER, defaultValue: 0 },
		thievery: { type: Datatypes.INTEGER, defaultValue: 0 },
		loremaster: { type: Datatypes.INTEGER, defaultValue: 0 },
		persuasion: { type: Datatypes.INTEGER, defaultValue: 0 },
		leadership: { type: Datatypes.INTEGER, defaultValue: 0 },
		luck: { type: Datatypes.INTEGER, defaultValue: 0 },
		sight: { type: Datatypes.INTEGER, defaultValue: 0 },
		initiative: { type: Datatypes.INTEGER, defaultValue: 0 },
		movement: { type: Datatypes.INTEGER, defaultValue: 0 },
		movementSpeedBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		vitalityBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		vitalityPercentage: { type: Datatypes.INTEGER, defaultValue: 0 },
		chanceToHitBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		accuracyBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		dodgeBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		damageBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		armorBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		magicArmor: { type: Datatypes.INTEGER, defaultValue: 0 },
		magicArmorBoost: { type: Datatypes.INTEGER, defaultValue: 0 },
		reflection: { type: Datatypes.INTEGER, defaultValue: 0 },
		lifeSteal: { type: Datatypes.INTEGER, defaultValue: 0 },
		damage: { type: Datatypes.INTEGER, defaultValue: 0 },
		damageType: { type: Datatypes.INTEGER, defaultValue: 0 },
		statusEffect: { type: Datatypes.INTEGER, defaultValue: 0 },
		statusIcon: { type: Datatypes.INTEGER, defaultValue: 0 },
		statusMaterial: { type: Datatypes.INTEGER, defaultValue: 0 },
		isConsumable: { type: Datatypes.INTEGER, defaultValue: 0 },
		isFood: { type: Datatypes.INTEGER, defaultValue: 0 },
	}, {
		freezeTableName: true
	});

	ItemStats.associate = (models) => {
		models.ItemStats.hasMany(models.RecipeResult, { unique: false });
		// models.ItemStats.hasMany(models.Ingredient);
	};

	return ItemStats;
};
