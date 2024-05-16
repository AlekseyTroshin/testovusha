import {encoded, translations} from "./data.js"

console.log("Let's rock")
console.log(encoded)

const decoded = JSON.parse(JSON.stringify(encoded));
const unicObj = {};

decoded.forEach((obj) => {
	for (let item in obj) {
		if (item === 'groupId' || item === 'service' || item === 'formatSize' || item === 'ca') continue;
		
		let trItem = translations[obj[item]];

		if (unicObj[trItem]) {
			unicObj[trItem] += 1;
		} else {
			unicObj[trItem] = 1;
		}

		obj[item] = (trItem === "" || trItem) ? trItem : obj[item];
	}
});

console.log(decoded);

let u = unic(unicObj);

if (u.length) {
	// уникальные выбирал из ENCODED 
	console.log('\nУникальные');
	console.log(u);
}

function unic(obj) {
	const arr = [];
	const arrUnic = [];
	for (let item in obj) {
		if (obj[item] == 1) {
			let num = findObj(translations, item);
			encoded.forEach(obj => 
				findObj(obj, num) ? arrUnic.push(obj) : ''
			)
		}
	}

	return arrUnic;
}

function findObj(obj, value) {
	return Object.keys(obj).find(k => obj[k] === value);
}
