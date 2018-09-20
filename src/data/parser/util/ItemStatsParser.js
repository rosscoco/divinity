// Name	Parent	RootTemplate		ComboCategory		Weight	Value	Strength	Finesse	Intelligence	Constitution	Memory	Wits	SingleHanded	TwoHanded	Ranged	DualWielding	PhysicalArmorMastery	MagicArmorMastery	VitalityMastery	PainReflection	WarriorLore	RangerLore	RogueLore	Sourcery	Telekinesis	FireSpecialist	WaterSpecialist	AirSpecialist	EarthSpecialist	Necromancy	Polymorph	Summoning	Sneaking	Thievery	Loremaster	Repair	Barter	Persuasion	Leadership	Luck	FireResistance	EarthResistance	WaterResistance	AirResistance	PoisonResistance	PiercingResistance	PhysicalResistance	Sight	Hearing	Initiative	Movement	MovementSpeedBoost	Vitality	VitalityBoost	VitalityPercentage	ChanceToHitBoost	AccuracyBoost	DodgeBoost	DamageBoost	RangeBoost	APCostBoost	SPCostBoost	APMaximum	APStart	APRecovery	CriticalChance	Gain	Armor	ArmorBoost	MagicArmor	MagicArmorBoost	Duration	UseAPCost	Reflection	LifeSteal	Damage	Damage Multiplier	Damage Range	DamageType	ActionPoints	MagicPoints	BloodSurfaceType	MaxSummons	AddToBottomBar	ExtraProperties	BoostConditions	Flags	BonusWeapon	StatusEffect	StatusIcon	StatusMaterial	SavingThrow		IsConsumable	IsFood	SummonLifelinkModifier		RuneLevel	RuneEffectWeapon	RuneEffectUpperbody	RuneEffectAmulet	ObjectCategory		Comment
// let Name; let Parent; let RootTemplate; let ModifierType; let Act; let Level; let Value; let Weight; let ComboCategory; let Requirements; let Strength; let Finesse; let Intelligence; let Constitution; let Memory; let Wits; let Vitality; let Armor; let PiercingResistance; let PhysicalResistance; let FireResistance; let EarthResistance; let WaterResistance; let AirResistance; let PoisonResistance; let Flags; letObjectCategory;
const name = 'ItemStats';
const propertyNames = ['Name', 'RootTemplate', 'ModifierType', 'Value', 'Weight', 'ComboCategory', 'Requirements',
	'Strength', 'Finesse', 'Intelligence', 'Constitution', 'Memory', 'Wits', 'Vitality',
	'Armor', 'PiercingResistance', 'PhysicalResistance', 'FireResistance', 'EarthResistance', 'WaterResistance', 'AirResistance', 'PoisonResistance',
	'Flags', 'ObjectCategory'];

function extract(data) {
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
