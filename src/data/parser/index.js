
require('babel-register');
const path = require('path');

const csvloader = require('./CSVLoader');
const itemCombos = require('./ItemComboParser');
const itemStats = require('./ItemParser');
const StatsEditor = require('./util/StatsEditor');

const dataFolder = path.join(__dirname, '../../../data');
const files = ['ItemStats', 'PotionStats', 'WeaponStats', 'ArmourStats', 'ShieldStats'];
// const files = ['ItemStats'];
// const fileIndex = 0;

csvloader(dataFolder, 'ItemCombos', itemCombos)
	.then(() => Promise.all(files.map(file => csvloader(dataFolder, file, itemStats))))
	// .then(() => csvloader(dataFolder, files[fileIndex++], itemStats))	// convert our tab files to json
	// .then(() => csvloader(dataFolder, files[fileIndex++], itemStats))
	// .then(() => csvloader(dataFolder, files[fileIndex++], itemStats))
	// .then(() => csvloader(dataFolder, files[fileIndex++], itemStats))
	// .then(() => csvloader(dataFolder, files[fileIndex++], itemStats))
	.then(() => {
		StatsEditor.itemsInheritParentStats(files);
		StatsEditor.importDescriptionData(files);
		StatsEditor.localizeItemNames(files);
		StatsEditor.exportMergedStats(files);
	});
