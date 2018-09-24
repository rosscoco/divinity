const name = 'ItemCombos';

function getPropertyList(property, fromNode) {
	const ingredients = [];
	for	(let i = 1; i <= 5; i++) {
		const id = property + i;
		if (fromNode[id] !== '' && fromNode[id] !== undefined) {
			ingredients.push(fromNode[id]);
		}
	}

	return ingredients;
}

function extract(data) {
	const item = {};

	item.ingredients = getPropertyList('Object ', data);
	item.results = getPropertyList('Result ', data);
	item.ingredientTypes = getPropertyList('Type ', data);
	item.stats = data.PreviewStatsID;
	item.name = item.results[0];		// not everything has a result. These special cases have their outpt defined on a different node

	if (item.stats === '') item.stats = item.name;

	if (item.results.length === 0) return null;

	return item;
}

module.exports = extract;
