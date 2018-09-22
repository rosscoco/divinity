const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

let db;
let ITEMTEXT;

function updateRecordsFromParent() {
	const p = [];
	return db.ItemStats.findAll({
		where: {
			parent: {
				[Op.not]: undefined
			}
		},
		attributes: ['id']
	}).then((results) => {
		results.forEach((statsId) => {
			debugger;
		});
	});
}

function createItemStats() {
	const toCreate = [];

	const files = ['ItemStats.json', 'PotionStats.json', 'WeaponStats.json', 'ArmourStats.json'];
	const dataFolder = path.join(__dirname, '../../../data/output/');
	let itemDataArr = [];
	files.forEach((file) => {
		console.log(`Loading file ${file}`);
		const f = fs.readFileSync(path.join(dataFolder, file), 'utf-8');
		const data = JSON.parse(f);
		itemDataArr = itemDataArr.concat(data);
	});

	itemDataArr.forEach((element) => {
		const newItem = {};
		const id = element.rootTemplate;
		Object.assign(newItem, element);
		Object.assign(newItem, ITEMTEXT[id]);
		newItem.id = newItem.name;
		delete newItem.name;
		toCreate.push(newItem);
	});

	return db.ItemStats.bulkCreate(toCreate)
		.then(() => updateRecordsFromParent());
}

module.exports = function (sequelize, itemData, itemTextData) {
	db = sequelize;
	ITEMTEXT = itemTextData;

	return createItemStats();
};
