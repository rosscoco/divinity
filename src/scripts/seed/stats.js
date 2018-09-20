// const { Op } = require('sequelize');
let db;
let ITEMSTATS;
let ITEMTEXT;

function createItemStats() {
	const toCreate = [];
	ITEMSTATS.forEach((element) => {
		const newItem = {};
		const id = element.rootTemplate;
		Object.assign(newItem, element);
		Object.assign(newItem, ITEMTEXT[id]);
		newItem.id = newItem.name;
		delete newItem.name;
		toCreate.push(newItem);
	});

	return db.ItemStats.bulkCreate(toCreate);
}

module.exports = function (sequelize, itemData, itemTextData) {
	db = sequelize;
	ITEMSTATS = itemData;
	ITEMTEXT = itemTextData;

	return createItemStats();
};
