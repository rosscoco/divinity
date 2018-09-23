const csv = require('fast-csv');
const path = require('path');
const fs = require('fs');


// module.exports = function (input, output, extractFunction) {
module.exports = function (dataFolder, name, extractor) {
	const foundItems = [];
	const inPath = path.join(dataFolder, 'input', `${name}.txt`);
	const outPath = path.join(dataFolder, 'output', `${name}.json`);
	const extract = extractor;
	const inFile = fs.readFileSync(inPath, 'utf-8');

	return new Promise((res, rej) => {
		csv.fromString(inFile, { headers: true, trim: true, delimiter: '	' })
			.on('data', (data) => {
				foundItems.push(extract(data));
			})
			.on('error', (err) => {
				rej(err);
			})
			.on('end', () => {
				const outputJson = JSON.stringify(foundItems, null, 4);
				fs.writeFileSync(outPath, outputJson);
				console.log(`Created file ${outPath}`);
				res();
			});
	});
};
