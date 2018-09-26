let ITEMSTATS;
let db;

function createItemStats() {
	const toCreate = [];

	// const itemDataArr = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/output/ItemStatsMerged.json'), 'utf-8'));

	ITEMSTATS.forEach((element) => {
		const newItem = {};
		Object.assign(newItem, element);
		newItem.id = newItem.name;
		delete newItem.name;
		toCreate.push(newItem);
	});

	return db.ItemStats.bulkCreate(toCreate);
}

module.exports = function (sequelize, itemData) {
	db = sequelize;
	ITEMSTATS = itemData;

	return createItemStats()
		.catch((err) => {
			debugger;
			console.log(err);
		});
};
