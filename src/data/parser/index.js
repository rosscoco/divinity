require('babel-register');
// require('./GUIDParser');
const csvloader = require('./CSVLoader');
const itemCombos = require('./util/ItemComboParser');
const itemStats = require('./util/ItemStatsParser');

csvloader(itemCombos)
	.then(() => csvloader(itemStats));
