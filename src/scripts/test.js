const fs = require('fs');
const stats = require('../../data/output/ItemStatsMerged.json');

const found = {};

stats.forEach((item) => {
	if (found[item.name]) found[item.name]++;
	else found[item.name] = 1;
});

const keys = Object.keys(found);

keys.forEach((key) => {
	if (found[key] > 1) console.log(key);
});

fs.writeFileSync('./List.txt', JSON.stringify(found, null, 4));
