const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../../../data/input/ItemCombos.txt'), 'utf-8');

const foundItems = [];


function getPropertyList(property, fromNode) {
	const ingredients = [];
	for	(let i = 1; i <= 5; i++) {
		const name = property + i;
		if (fromNode[name] !== '' && fromNode[name] !== undefined) {
			ingredients.push(fromNode[name]);
		}
	}

	return ingredients;
}

csv.fromString(file, { headers: true })
	.on('data', (data) => {
		const item = {};
		console.log(data);
		item.ingredients = getPropertyList('Object ', data);
		item.results = getPropertyList('Result ', data);
		item.ingredientTypes = getPropertyList('Type ', data);
		item.stats = data.PreviewStatsID;
		foundItems.push(item);
	})
	.on('end', () => {
		const output = JSON.stringify(foundItems, null, 4);
		fs.writeFileSync(path.join(__dirname, '../../../data/output/ParsedItemCombos.json'), output);
	});
