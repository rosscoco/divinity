
require('babel-register');
const path = require('path');

const fs = require('fs');
// require('./GUIDParser');
const csvloader = require('./CSVLoader');
const itemCombos = require('./util/ItemComboParser');
const itemStats = require('./util/ItemParser');

const dataFolder = path.join(__dirname, '../../../data');
const files = ['ItemStats', 'PotionStats', 'WeaponStats', 'ArmourStats'];
let fileIndex = 0;

function getStatsIndexedByName() {
	let combinedData = [];
	const itemsHash = {};

	files.forEach((file) => {
		const loadedFile = fs.readFileSync(path.join(__dirname, '../../../data', 'output', `${file}.json`), 'utf-8');
		combinedData = combinedData.concat(JSON.parse(loadedFile));
	});

	combinedData.forEach((dataObj) => {
		itemsHash[dataObj.name] = dataObj;
	});

	return itemsHash;
}

function updateItemDescriptions(itemDataArray) {
	const file = fs.readFileSync(path.join(__dirname, '../../../data/output/ItemGUID.json'), 'utf-8');
	const textData = JSON.parse(file);
	itemDataArray.forEach((itemData) => {
		if (itemData.hasOwnProperty('rootTemplate')
			&& itemData.rootTemplate !== '') {
			const itemText = textData[itemData.rootTemplate];
			Object.assign(itemData, itemText);
		}
	});

	return itemDataArray;
}

function updateItemsWithParentProperties(itemDataArray) {
	const itemNameHash = getStatsIndexedByName();

	itemDataArray.forEach((itemData) => {
		if (itemData.hasOwnProperty('parent')
				&& itemData.parent !== '') {
			const parentStats = itemNameHash[itemData.parent];
			if (parentStats === undefined) throw new Error(`Could not find parent data for ${itemData.parent}`);
			Object.keys(parentStats).forEach((parentProperty) => {
				// only copy over property values if not already defined on the child
				if (!itemData.hasOwnProperty(parentProperty)
						|| itemData[parentProperty] === '') {
					itemData[parentProperty] = parentStats[parentProperty];
				}
			});
		}
	});

	return itemDataArray;
}


function loadAndModifyStatsFiles(editJSONFunc) {
	files.forEach((file) => {
		const loadedFile = fs.readFileSync(path.join(__dirname, '../../../data', 'output', `${file}.json`), 'utf-8');
		const updatedItemStats = editJSONFunc(JSON.parse(loadedFile));
		fs.writeFileSync(path.join(dataFolder, 'output', `${file}.json`), JSON.stringify(updatedItemStats, null, 4));
	});
}

function createSingleStatsFile() {
	let allStats = [];
	files.forEach((file) => {
		const loadedFile = fs.readFileSync(path.join(__dirname, '../../../data', 'output', `${file}.json`), 'utf-8');
		allStats = allStats.concat(JSON.parse(loadedFile));
	});

	fs.writeFileSync(path.join(dataFolder, 'output/ItemStatsMerged.json'), JSON.stringify(allStats, null, 4));
}

csvloader(dataFolder, 'ItemCombos', itemCombos)
	.then(() => csvloader(dataFolder, files[fileIndex++], itemStats))	// convert our tab files to json
	.then(() => csvloader(dataFolder, files[fileIndex++], itemStats))
	.then(() => csvloader(dataFolder, files[fileIndex++], itemStats))
	.then(() => csvloader(dataFolder, files[fileIndex++], itemStats))
	.then(() => {
		const itemIndex = getStatsIndexedByName();
		loadAndModifyStatsFiles(updateItemsWithParentProperties);
		loadAndModifyStatsFiles(updateItemDescriptions);
		createSingleStatsFile();
	});
