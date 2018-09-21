
require('babel-register');
const path = require('path');
// require('./GUIDParser');
const csvloader = require('./CSVLoader');
const itemCombos = require('./util/ItemComboParser');
const itemStats = require('./util/ItemParser');

const dataFolder = path.join('../../../data');

csvloader(dataFolder, 'ItemCombos', itemCombos)
	.then(() => csvloader(dataFolder, 'ItemStats', itemStats))
	.then(() => csvloader(dataFolder, 'PotionStats', itemStats))
	.then(() => csvloader(dataFolder, 'WeaponStats', itemStats))
	.then(() => csvloader(dataFolder, 'ArmourStats', itemStats));
