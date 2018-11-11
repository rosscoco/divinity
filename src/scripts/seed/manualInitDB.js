
let ingredientsTable = `CREATE TABLE 'Ingredients' (
 'id' INTEGER PRIMARY KEY AUTOINCREMENT,
 'name' VARCHAR(255),
 'displayName' VARCHAR(255),
 'description' VARCHAR(255),
 'icon' VARCHAR(255),
 'category' VARCHAR(255));`;

let itemStatsTable = `CREATE TABLE 'ItemStats' (
    'id' VARCHAR(255) PRIMARY KEY, 
    'name' VARCHAR(255), 
    'displayName' VARCHAR(255), 
    'parent' VARCHAR(255), 
    'rootTemplate' VARCHAR(255), 
    'modifierType' VARCHAR(255), 
    'value' INTEGER, 
    'weight' INTEGER, 
    'comboCategory' VARCHAR(255), '
	requirements' VARCHAR(255), 'strength' INTEGER, 'finesse' INTEGER, 'intelligence' INTEGER, 'constitution' INTEGER, 'memory' INTEGER, 'wits' INTEGER, 'vitality' INTEGER, 'armor' INTEGER, 'piercingResistance' INTEGER, 'physicalResistance' INTEGER, 'fireResistance' INTEGER, 'earthResistance' INTEGER, 'waterResistance' INTEGER, 'airResistance' INTEGER, 'poisonResistance' INTEGER, 'flags' VARCHAR(255), 'objectCategory' VARCHAR(255), 'ranged' INTEGER, 'dualWielding' INTEGER, 'physicalArmorMastery' INTEGER, 'necromancy' INTEGER, 'polymorph' INTEGER, 'summoning' INTEGER, 'sneaking' INTEGER, 'thievery' INTEGER, 'loremaster' INTEGER, 'persuasion' INTEGER, 'leadership' INTEGER, 'luck' INTEGER, 'sight' INTEGER, 'initiative' INTEGER, 'movement' INTEGER, 'movementSpeedBoost' INTEGER, 'vitalityBoost' INTEGER, 'vitalityPercentage' INTEGER, 'chanceToHitBoost' INTEGER, 'accuracyBoost' INTEGER, 'dodgeBoost' INTEGER, 'damageBoost' INTEGER, 'armorBoost' INTEGER, 'magicArmor' INTEGER, 'magicArmorBoost' INTEGER, 'reflection' INTEGER, 'lifeSteal' INTEGER, 'damage' INTEGER, 'damageType' VARCHAR(255), 'statusEffect' VARCHAR(255), 'statusIcon' VARCHAR(255), 'statusMaterial' VARCHAR(255), 'isConsumable' VARCHAR(255), 'isFood' VARCHAR(255), 'armorDefenseValue' INTEGER, 'magicArmorValue' INTEGER, 'itemGroup' VARCHAR(255), 'tags' VARCHAR(255), 'extraProperties' VARCHAR(255), 'boosts' VARCHAR(255), 'previewIcon' VARCHAR(255), 'previewTooltip' VARCHAR(255));`;

let recipeTable = `CREATE TABLE 'Recipe' (
'ItemStatId' VARCHAR(255) NOT NULL REFERENCES 'ItemStats' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
'RecipeResultId' INTEGER NOT NULL REFERENCES 'RecipeResults' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ('ItemStatId',
'RecipeResultId'))`;

let recipeResultsTable = `CREATE TABLE 'RecipeResults' ('id' INTEGER PRIMARY KEY,
'name' VARCHAR(255))`;

let recipeStatsTable = `CREATE TABLE 'RecipeStats' (
 'RecipeResultId' INTEGER NOT NULL REFERENCES 'RecipeResults' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
 'ItemStatId' VARCHAR(255) NOT NULL REFERENCES 'ItemStats' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
 PRIMARY KEY ('RecipeResultId',
 'ItemStatId'))`;
