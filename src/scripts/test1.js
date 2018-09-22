const objectProperties = ['Name', 'Parent', 'RootTemplate', 'ModifierType', 'Value', 'Weight', 'ComboCategory', 'Requirements',
	'Strength', 'Finesse', 'Intelligence', 'Constitution', 'Memory', 'Wits', 'Vitality',
	'Armor', 'PiercingResistance', 'PhysicalResistance', 'FireResistance', 'EarthResistance', 'WaterResistance', 'AirResistance', 'PoisonResistance',
	'Flags', 'ObjectCategory'];

const potionProperties = ['Ranged', 'DualWielding', 'PhysicalArmorMastery',
	'Necromancy', 'Polymorph', 'Summoning', 'Sneaking', 'Thievery', 'Loremaster', 'Persuasion', 'Leadership', 'Luck', 'Sight', 'Initiative',
	'Movement', 'MovementSpeedBoost', 'VitalityBoost', 'VitalityPercentage', 'ChanceToHitBoost', 'AccuracyBoost', 'DodgeBoost', 'DamageBoost',
	'Armor', 'ArmorBoost', 'MagicArmor', 'MagicArmorBoost', 'Reflection', 'LifeSteal', 'Damage', 'DamageType',
	'StatusEffect', 'StatusIcon', 'StatusMaterial', 'IsConsumable', 'IsFood'].concat(objectProperties);

const armourProperties = ['Requirements', 'ArmorDefenseValue', 'ArmorBoost', 'MagicArmorValue', 'MagicArmorBoost'].concat(objectProperties);

const weaponProperties = ['ItemGroup', 'ModifierType', 'ComboCategory', 'Tags', 'ExtraProperties', 'Flags', 'Boosts'].concat(objectProperties);

function extract() {
	const propertyNames = objectProperties.concat(potionProperties).concat(armourProperties).concat(weaponProperties);

	propertyNames.forEach((p) => {
		console.log(`${p.substr(0, 1).toLowerCase() + p.substr(1)}:type: Datatypes.STRING`);
	});
}

extract();
