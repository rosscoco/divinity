// SingleHanded TwoHanded	Ranged	DualWielding	PhysicalArmorMastery	MagicArmorMastery	VitalityMastery	PainReflection	WarriorLore	RangerLore	RogueLore	Sourcery	Telekinesis	FireSpecialist	WaterSpecialist	AirSpecialist	EarthSpecialist	Necromancy	Polymorph	Summoning	Sneaking	Thievery	Loremaster	Repair	Barter	Persuasion	Leadership	Luck		Sight	Hearing	Initiative	Movement	MovementSpeedBoost		VitalityBoost	VitalityPercentage	ChanceToHitBoost	AccuracyBoost	DodgeBoost	DamageBoost	RangeBoost	APCostBoost	SPCostBoost	APMaximum	APStart	APRecovery	CriticalChance	Gain	Armor	ArmorBoost	MagicArmor	MagicArmorBoost	Duration	UseAPCost	Reflection	LifeSteal	Damage	Damage Multiplier	Damage Range	DamageType	ActionPoints	ExtraProperties		Flags	BonusWeapon	StatusEffect	StatusIcon	StatusMaterial	SavingThrow		IsConsumable	IsFood	SummonLifelinkModifier		RuneLevel	RuneEffectWeapon	RuneEffectUpperbody	RuneEffectAmulet	ObjectCategory		Comment
// let Name; let Parent; let RootTemplate; let ModifierType; let Act; let Level; let Value; let Weight; let ComboCategory; let Requirements; let Strength; let Finesse; let Intelligence; let Constitution; let Memory; let Wits; let Vitality; let Armor; let PiercingResistance; let PhysicalResistance; let FireResistance; let EarthResistance; let WaterResistance; let AirResistance; let PoisonResistance; let Flags; letObjectCategory;
const name = 'ItemStats';
const objectProperties = ['Name', 'Parent', 'RootTemplate', 'ModifierType', 'Value', 'Weight', 'ComboCategory', 'Requirements',
	'Strength', 'Finesse', 'Intelligence', 'Constitution', 'Memory', 'Wits', 'Vitality',
	'Armor', 'PiercingResistance', 'PhysicalResistance', 'FireResistance', 'EarthResistance', 'WaterResistance', 'AirResistance', 'PoisonResistance',
	'Flags', 'ObjectCategory'];

const potionProperties = ['Ranged', 'DualWielding', 'PhysicalArmorMastery', 'MagicArmorMastery', 'VitalityMastery', 'PainReflection', 'WarriorLore', 'RangerLore',
	'RogueLore', 'Sourcery', 'Telekinesis', 'FireSpecialist', 'WaterSpecialist', 'AirSpecialist', 'EarthSpecialist', 'Necromancy', 'Polymorph',
	'Summoning', 'Sneaking', 'Thievery', 'Loremaster', 'Repair', 'Barter', 'Persuasion', 'Leadership', 'Luck', 'Sight', 'Hearing', 'Initiative',
	'Movement', 'MovementSpeedBoost', 'VitalityBoost', 'VitalityPercentage', 'ChanceToHitBoost', 'AccuracyBoost', 'DodgeBoost', 'DamageBoost',
	'RangeBoost', 'APCostBoost', 'SPCostBoost', 'APMaximum', 'APStart', 'APRecovery', 'CriticalChance', 'Gain', 'Armor', 'ArmorBoost', 'MagicArmor',
	'MagicArmorBoost', 'Reflection', 'LifeSteal', 'Damage', 'DamageType', 'ActionPoints', 'ExtraProperties',
	'StatusEffect', 'StatusIcon', 'StatusMaterial', 'IsConsumable', 'IsFood',
	'RuneEffectWeapon', 'RuneEffectUpperbody', 'RuneEffectAmulet', 'Comment',
	'Damage Multiplier',].concat(objectProperties);

const armourProperties = ['Name', 'Parent', 'ItemGroup', 'ModifierType', 'Requirements', 'ArmorDefenseValue', 'ArmorBoost', 'MagicArmorValue', 'MagicArmorBoost',
	'Initiative', 'Fire', 'Air', 'Water', 'Earth', 'Poison', 'Piercing', 'Physical', 'SingleHanded',
	'TwoHanded', 'Ranged', 'DualWielding', 'Perseverance', 'Leadership', 'PainReflection', 'WarriorLore',
	'RangerLore', 'RogueLore', 'Sourcery', 'FireSpecialist', 'WaterSpecialist', 'AirSpecialist', 'EarthSpecialist', 'Necromancy', 'Polymorph',
	'Summoning', 'Telekinesis', 'Sneaking', 'Thievery', 'Loremaster', 'Repair', 'Barter', 'Persuasion', 'Luck', 'Sight', 'Hearing', 'Vitality',
	'MagicPoints', 'ChanceToHit', 'APMaximum', 'APStart', 'APRecovery', 'Accuracy', 'Dodge', 'CriticalChance', 'Reflection', 'MaxSummons', 'Skills',
	'Talents', 'Tags', 'ExtraProperties', 'Boosts', 'ArmorType', 'RuneSlots', 'RuneSlots_V1'].concat(objectProperties);

const weaponProperties = ['ItemGroup', 'ModifierType', 'ComboCategory', 'Tags', 'ExtraProperties', 'Flags', 'Boosts'].concat(objectProperties);

function extract(data, type) {
	let propertyNames;
	switch (type) {
	case 'OBJECT':	propertyNames = objectProperties;
		break;
	case 'POTION':	propertyNames = potionProperties;
		break;
	case 'ARMOUR':	propertyNames = armourProperties;
		break;
	case 'WEAPON':	propertyNames = weaponProperties;
		break;
	default:		throw new Error(`Invalid Object Type ${type}`);
	}
	const copy = {};
	const keys = Object.keys(data);
	keys.forEach((prop) => {
		if (propertyNames.indexOf(prop) !== -1
			&& propertyNames.indexOf(prop) !== ''
			&& propertyNames.indexOf(prop) !== undefined) {
			const camelCase = prop.substr(0, 1).toLowerCase() + prop.substr(1);
			copy[camelCase] = data[prop];
		}
	});

	return copy;
}

module.exports = { extract, name };
