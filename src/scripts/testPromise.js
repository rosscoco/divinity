/* eslint-disable */
function makePromise(withMessage) {
	return new Promise((res) => {
		const msg = withMessage;
		setTimeout(() => {
			console.log(`${msg}`);
			res();
		}, 1000);
	});
}

function makeNestedPromise(withMessage) {
	const p = new Promise((res) => {
		const msg = withMessage;
		setTimeout(() => {
			console.log(`${msg}`);
			res();
		}, 250);
	}).then(() => {
		makePromise('		third promise').then(() => console.log('			Third promise done'));
	});

	return Promise.all([p]);
}


function checkPromises() {
	const promises = [];
	for (let i = 0; i < 5; i++) {
		const p1 = makePromise('outer promise')
			.then(() => makeNestedPromise('		inner promise'));
		promises.push(p1);
	}

	Promise.all(promises)
		.then(() => console.log('Promise chain complete'));
}

checkPromises();
