// SingleHanded TwoHanded	Ranged	DualWielding	PhysicalArmorMastery	MagicArmorMastery	VitalityMastery	PainReflection	WarriorLore	RangerLore	RogueLore	Sourcery	Telekinesis	FireSpecialist	WaterSpecialist	AirSpecialist	EarthSpecialist	Necromancy	Polymorph	Summoning	Sneaking	Thievery	Loremaster	Repair	Barter	Persuasion	Leadership	Luck		Sight	Hearing	Initiative	Movement	MovementSpeedBoost		VitalityBoost	VitalityPercentage	ChanceToHitBoost	AccuracyBoost	DodgeBoost	DamageBoost	RangeBoost	APCostBoost	SPCostBoost	APMaximum	APStart	APRecovery	CriticalChance	Gain	Armor	ArmorBoost	MagicArmor	MagicArmorBoost	Duration	UseAPCost	Reflection	LifeSteal	Damage	Damage Multiplier	Damage Range	DamageType	ActionPoints	ExtraProperties		Flags	BonusWeapon	StatusEffect	StatusIcon	StatusMaterial	SavingThrow		IsConsumable	IsFood	SummonLifelinkModifier		RuneLevel	RuneEffectWeapon	RuneEffectUpperbody	RuneEffectAmulet	ObjectCategory		Comment
// let Name; let Parent; let RootTemplate; let ModifierType; let Act; let Level; let Value; let Weight; let ComboCategory; let Requirements; let Strength; let Finesse; let Intelligence; let Constitution; let Memory; let Wits; let Vitality; let Armor; let PiercingResistance; let PhysicalResistance; let FireResistance; let EarthResistance; let WaterResistance; let AirResistance; let PoisonResistance; let Flags; letObjectCategory;

const objectProperties = ['Name', 'Parent', 'RootTemplate', 'ModifierType', 'Value', 'Weight', 'ComboCategory', 'Requirements',
	'Strength', 'Finesse', 'Intelligence', 'Constitution', 'Memory', 'Wits', 'Vitality',
	'Armor', 'PiercingResistance', 'PhysicalResistance', 'FireResistance', 'EarthResistance', 'WaterResistance', 'AirResistance', 'PoisonResistance',
	'Flags', 'ObjectCategory', 'PreviewIcon', 'PreviewTooltip'];

const potionProperties = ['Ranged', 'DualWielding', 'PhysicalArmorMastery',
	'Necromancy', 'Polymorph', 'Summoning', 'Sneaking', 'Thievery', 'Loremaster', 'Persuasion', 'Leadership', 'Luck', 'Sight', 'Initiative',
	'Movement', 'MovementSpeedBoost', 'VitalityBoost', 'VitalityPercentage', 'ChanceToHitBoost', 'AccuracyBoost', 'DodgeBoost', 'DamageBoost',
	'Armor', 'ArmorBoost', 'MagicArmor', 'MagicArmorBoost', 'Reflection', 'LifeSteal', 'Damage', 'DamageType',
	'StatusEffect', 'StatusIcon', 'StatusMaterial', 'IsConsumable', 'IsFood'].concat(objectProperties);

const armourProperties = ['Requirements', 'ArmorDefenseValue', 'ArmorBoost', 'MagicArmorValue', 'MagicArmorBoost'].concat(objectProperties);

const weaponProperties = ['ItemGroup', 'ModifierType', 'ComboCategory', 'Tags', 'ExtraProperties', 'Flags', 'Boosts'].concat(objectProperties);

const categoryProperties = ['Type', 'Icon', 'Tooltip', 'Comment'];

function extract(data) {
	const propertyNames = objectProperties.concat(potionProperties).concat(armourProperties).concat(weaponProperties).concat(categoryProperties);
	const copy = {};
	const keys = Object.keys(data);

	keys.forEach((prop) => {
		if (propertyNames.indexOf(prop) !== -1
			&& data[prop] !== ''
			&& data[prop] !== undefined) {
			const camelCase = prop.substr(0, 1).toLowerCase() + prop.substr(1);
			copy[camelCase] = data[prop];
		}
	});

	return copy;
}


module.exports = extract;
