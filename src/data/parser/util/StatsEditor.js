/* eslint-disable no-underscore-dangle */
const path = require('path');
const fs = require('fs');

const dataFolder = path.join(__dirname, './../../../../data');

// IMPORTED JSON FILES
const _ITEMNAMES = require('../../../../data/output/ItemNamesHash.json');
// const _RECIPENAMES = require('../../../../data/output/ItemComboResultNameHash.json');

let inputFileNames;

function validateItemNames(allItemStats) {
	const found = [];
	const notFound = [];

	allItemStats.forEach((details) => {
		const itemName = details.name;
		// const newDetails = {};
		if (_ITEMNAMES.hasOwnProperty(itemName)) {
			// Object.assign(newDetails, details);
			// newDetails.displayName = _ITEMNAMES[itemName].name;
			// found.push(newDetails);
			details.displayName = _ITEMNAMES[itemName].name;
		} else {
			notFound.push(details.name);
		}
	});

	console.log(`Updating item display names from ItemNamesHash.json. Found ${found.length}/${found.length + notFound.length}`);
	console.log(notFound);

	return allItemStats;
}

function convertCategoriesToItems() {
	const loadedFile = fs.readFileSync(path.join(dataFolder, 'output', 'ObjectCategories.json'), 'utf-8');
	const data = JSON.parse(loadedFile);
	data.forEach((stats) => {
		stats.displayName = stats.tooltip;
		stats.previewIcon = stats.icon;
		delete stats.tooltip;
		delete stats.icon;
	});

	fs.writeFileSync(path.join(dataFolder, 'output', 'ObjectCategories.json'), JSON.stringify(data, null, 4));

	return data;
}


function getStatsIndexedByName(files) {
	let combinedData = [];
	const itemsHash = {};

	files.forEach((file) => {
		const loadedFile = fs.readFileSync(path.join(dataFolder, 'output', `${file}.json`), 'utf-8');
		combinedData = combinedData.concat(JSON.parse(loadedFile));
	});

	combinedData.forEach((dataObj) => {
		itemsHash[dataObj.name] = dataObj;
	});

	return itemsHash;
}

function updateItemDescriptions(itemDataArray) {
	const file = fs.readFileSync(path.join(dataFolder, 'output', 'ItemGUID.json'), 'utf-8');
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
	const itemNameHash = getStatsIndexedByName(inputFileNames);

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


function exportMergedStats(files) {
	let allStats = [];
	files.forEach((file) => {
		const loadedFile = fs.readFileSync(path.join(dataFolder, 'output', `${file}.json`), 'utf-8');
		allStats = allStats.concat(JSON.parse(loadedFile));
	});

	fs.writeFileSync(path.join(dataFolder, 'output', 'ItemStatsMerged.json'), JSON.stringify(allStats, null, 4));
}

function loadAndModifyStatsFiles(files, editJSONFunc) {
	inputFileNames = files;
	files.forEach((file) => {
		const loadedFile = fs.readFileSync(path.join(dataFolder, 'output', `${file}.json`), 'utf-8');
		const updatedItemStats = editJSONFunc(JSON.parse(loadedFile));
		fs.writeFileSync(path.join(dataFolder, 'output', `${file}.json`), JSON.stringify(updatedItemStats, null, 4));
	});
}

// Where an item stats object has a 'parent' property copy over all stats to the child object to prevent a second lookup on those stats
function itemsInheritParentStats(files) {
	loadAndModifyStatsFiles(files, updateItemsWithParentProperties);
}
// localized description data is stored ina spearate file indexed by a UUID. Copy across to the item data JSON
// loads from data/output/ItemGUID.json
function importDescriptionData(files) {
	loadAndModifyStatsFiles(files, updateItemDescriptions);
}
// (some) localized item display names ar stored in another spearate file indexed by a UUID. Copy across to the item data JSON
function localizeItemNames(files) {
	loadAndModifyStatsFiles(files, validateItemNames);
}

module.exports = {
	itemsInheritParentStats, importDescriptionData, localizeItemNames, exportMergedStats, convertCategoriesToItems
};
