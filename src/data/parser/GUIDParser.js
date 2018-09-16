import fs from 'fs';
import util from 'util';
import path from 'path';

const readFileThen = util.promisify(fs.readFile);
const writeFileThen = util.promisify(fs.writeFile);
let found = 0;
let saved = 0;
function load(pathToFile, next) {
	let items;
	readFileThen(pathToFile)
		.then((file) => {
			const data = JSON.parse(file);
			const gameObjects = data.save.regions.Templates.GameObjects;

			items = gameObjects.reduce((collection, gameObject) => {
				found++;
				const itemData = {};
				try {
					if (gameObject.Description) itemData.description = gameObject.Description.value;
					if (gameObject.Icon) itemData.icon = gameObject.Icon.value;
					if (gameObject.Stats) itemData.stats = gameObject.Stats.value;
					if (gameObject.DisplayName) itemData.displayName = gameObject.DisplayName.value;
					if (gameObject.name) itemData.name = gameObject.Name.value;

					saved++;

					collection[gameObject.MapKey.value] = itemData;				// MapKey is the internal GUID
					return collection;
				} catch (e) {
					return collection;
				}
			}, {});
			const outpath = path.join(__dirname, '..', '..', '..', 'data', 'output', 'ItemGUID.json');
			writeFileThen(outpath, JSON.stringify(items, null, 4))
				.then(() => {
					if (next) next();
				}, (err) => {
					if (next) next(err);
					console.log(`Error writing file ${outpath}`);
				});
		}, err => console.log(`There was an error reading file ${err}`));
}

function done(err) {
	if (err) {
		console.log(`There was an error ${err}`);
	} else {
		console.log(`Done!: ${saved}/${found} saved`);
	}
}

const p = path.join(__dirname, '..', '..', '..', 'data', 'input', 'MergedJSON.json');
console.log(p);

load(p, done);

export default { load };
