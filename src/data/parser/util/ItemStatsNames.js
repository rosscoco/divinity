const fs = require('fs');
const path = require('path');
const data = require('../../../../data/input/StatsNames.json');


const sortedData = {};
let textList = '';
let counter = 0;
data.save.regions.TranslatedStringKeys.TranslatedStringKey.forEach((stringKey) => {
	const name = stringKey.Content.value;
	const { handle } = stringKey.Content;
	const { value: id } = stringKey.UUID;
	sortedData[id] = { name, handle, id };
	textList += `${++counter}.		${name}				${id}\n`;
});

const outDir = path.join(__dirname, '../../../../data/output');
fs.writeFileSync(`${outDir}/ItemNames.txt`, textList);
fs.writeFileSync(`${outDir}/ItemNamesHash.json`, JSON.stringify(sortedData, null, 4));
